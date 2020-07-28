//把源文件copy到打包后的目录，然后f返回访问路劲
const {getOptions } = require('loader-utils');
const mime = require('mime'); //获取文件名的后缀，并生成mime类型
function loader(source) {
   let {limit, fallback="file-loader"} = getOptions(this);
   let mimeType = mime.getType(this.resourcePath);
   if (limit) {
       limit = parseFloat(limit);
   }
   if (limit && source.length < limit) {
        let base64str = `data:${mimeType};base64,${source.toString('base64')}`;
        return `module.exports = ${JSON.stringify(base64str)}`;
    } else {
        let fileLoader = require(fallback|| 'file-loader');
        return fileLoader.call(this, source);
    }
   
}
loader.raw = true;
module.exports = loader;