const  { RawSource }= require('webpack-sources');
const jsZip = require('jszip');
class ZipPlugin {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            let zip = new jsZip();
            for(let file in compilation.assets) {
                 console.log(file);
                 zip.file(file, compilation.assets[file].source());
            }
            const {filename} = this.options;
            //移除原先的资源文件,仅留下zip打包后的文件
            compilation.assets = {};
            zip.generateAsync({type:'nodebuffer'}).then((content) => {
                compilation.assets[filename] = new RawSource(content);
                callback();
            })
        })
    }
}

module.exports=ZipPlugin;