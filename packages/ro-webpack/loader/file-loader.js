//把源文件copy到打包后的目录，然后f返回访问路劲
const {getOptions, interpolateName } = require('loader-utils');
function loader(content) {
    let {filename} = getOptions(this) || '';
    //翻译文件名字
    let url = interpolateName(this, filename || '[hash].[ext]', {content});
    //像dist发射文件夹
    this.emitFile(url, content);
    return `module.exports=${JSON.stringify(url)}`;
}
loader.raw = true;
module.exports = loader;