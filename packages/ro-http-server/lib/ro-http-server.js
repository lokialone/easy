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
    
    async responseDirectory(filename, pathname, response) {
        const indexPath = path.join(filename, 'index.html');
        try {
            await access(indexPath, fs.constants.R_OK);
            this.responseFile({filename: indexPath, response});
        } catch (error) {
            if (error.code && error.code == 'ENOENT') {
                return this.showDirList(filename, pathname, response);
            }
            console.error(error);
           
        }
    }
    async handlerRoute(request, response) {
        let {pathname} = url.parse(request.url);
        // 中文转义
        pathname = decodeURIComponent(pathname);
        let filename = path.join(this.root, pathname);
        try {
            let fileStat = await stat(filename);
            if (fileStat.isFile()) {
                this.responseFile({filename, response});
            } else if(fileStat.isDirectory()) {
                this.responseDirectory(filename,pathname, response);
            }
        } catch (error) {
            this.sendError(response, 'not fount', 404);
        }
    }
    sendError(response, error, status) {
        response.status = status;
        response.end(error);
    }
    showDirList(filename,pathname, res) {
        fs.readdir(filename, (err, dirs) => {
           if (err) this.sendError(response, 'error', 404);
           const data = dirs.reduce((acc, item) => {
                acc.push({dir: item, href: path.join(pathname, item)});
                return acc;
            }, []);
            this.responseFile({fileStr: template({dirs: data}), response: res})
        });

    }

    responseGzipFile({filename, response, fileStr}) {
        response.setHeader('Content-Encoding','gzip');
        if (fileStr) {
            gzip(fileStr, (err, data) => {
                response.end(data);
            })
        } else {
            fs.createReadStream(filename).pipe(createGzip()).pipe(response);
        }
    }
    responseFile({filename, response, fileStr}) {
        let type =  mime.getType(filename) || 'text/html';
        response.setHeader('Content-Type',type);
        // 文本文件且开启gzip时，需要使用gzip压缩
        // 最好是要开启检测一下浏览器是否支持gzip;
        if (type.startsWith('text/') && this.gzip) {
            this.responseGzipFile({filename, response, fileStr});
        } else {
             if (fileStr) {
                response.end(fileStr)
             } else {
                fs.createReadStream(filename).pipe(response);
             }
        }
        
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
