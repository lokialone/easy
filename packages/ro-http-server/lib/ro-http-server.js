const http  = require('http');
const fs = require('fs');
const {stat, access} = require('fs').promises;
const url  = require('url');
const path = require('path');
const debug = require('debug')('ro-http-server');
const mime = require('mime');
const Handlebars = require('handlebars');
const { createGzip, gzip } = require('zlib');
const templateStr = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

const template = Handlebars.compile(templateStr);
class roHttpServer {
    constructor({port, host, gzip, directory}) {
        this.port = port;
        this.host = host;
        this.gzip = gzip == 'true';
        this.root = directory
    }
    
    async responseDirectory(filename, pathname, request, response) {
        const indexPath = path.join(filename, 'index.html');
        try {
            const fileStat = await stat(indexPath);
            this.responseFile({filename: indexPath, response,request, fileStat});
        } catch (error) {
            if (error.code && error.code == 'ENOENT') {
                return this.showDirList(filename, pathname, request,response);
            }
            console.error(error);
           
        }
    }
    async handlerRoute(request, response) {
        let {pathname} = url.parse(request.url);
        // 中文转义
        pathname = decodeURIComponent(pathname);
        let filename = path.join(this.root, pathname);
        if (pathname === '/') filename = path.join(filename, 'index.html');
        try {
            let fileStat = await stat(filename);
            if (fileStat.isFile()) {
                this.responseFile({filename, response, request,fileStat});
            } else if(fileStat.isDirectory()) {

                this.responseDirectory(filename,pathname, request,response);
            }
        } catch (error) {
            if (error.code && error.code == 'ENOENT') {
                this.sendError(response, 'not fount', 404);
            }
             console.error(error);
            
        }
    }
    sendError(response, error, status) {
        response.status = status;
        response.end(error);
    }
    showDirList(filename,pathname, resquest, res) {
        fs.readdir(filename, (err, dirs) => {
           if (err) this.sendError(response, 'error', 404);
           const data = dirs.reduce((acc, item) => {
                acc.push({dir: item, href: path.join(pathname, item)});
                return acc;
            }, []);
            this.responseTemplteFile({fileStr: template({dirs: data}), resquest, response: res})
        });

    }
    responseGzipFile({filename, response}) {
        response.setHeader('Content-Encoding','gzip');
        fs.createReadStream(filename).pipe(createGzip()).pipe(response);
    }
    generateEtag(fileStats) {
        return `${fileStats.ino}-${fileStats.mtime}-${fileStats.size}`;
    }
    cache(fileStat,request, response) {
        response.setHeader('Expires', new Date(Date.now() + 30 * 1000));
        response.setHeader('Cache-control', 'max-age=30');
        const ifModifiedSince = request.headers['if-modified-since'];
        const ifnoneMatch = request.headers['if-none-match'];
        const ctime =fileStat.ctime.toGMTString();
        const etag = this.generateEtag(fileStat);
        response.setHeader('lasted-Modified',ctime);
        if (etag === ifnoneMatch || ifModifiedSince === ctime) {
            response.status = 304;
            response.end();
            return true;
        }
        return false;

    }
    responseTemplteFile({fileStr, response, request}) {
        response.setHeader('Content-Type','text/html');
            if (this.gzip) {
                response.setHeader('Content-Encoding','gzip');
                gzip(fileStr, (err, data) => {
                    response.end(data);
                })
            } else {
                response.end(fileStr);
            }
    }
    responseFile({filename, response, request, fileStat}) {
        // 文本文件且开启gzip时，需要使用gzip压缩
        // 最好是要开启检测一下浏览器是否支持gzip
        let type = mime.getType(filename) || 'text/html';
        response.setHeader('Content-Type',type);
        if (this.cache(fileStat, request, response)) return;
        if (type.startsWith('text/') && this.gzip) {
            return this.responseGzipFile({filename, response});
        }
        return fs.createReadStream(filename).pipe(response);
        
    }
    start() {
        const server = http.createServer(this.handlerRoute.bind(this));
        server.listen(this.port, () => {
            debug(`listening on http://${this.host}:${this.port}`);
        });
        server.on('error',(err) => {
            console.error(err);
        });
    }
    // close() {

    // }
}


module.exports = roHttpServer;
