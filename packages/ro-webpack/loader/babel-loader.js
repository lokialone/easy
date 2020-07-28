const babel = require('@babel/core');
function loader(source, sourceMap) {
    let options = {
        presets: ["@babel/preset-env"],
        inputSourceMap: sourceMap,
        sourceMap: true,
        filename: this.request.split('/').pop().slice(0, -3),
    }
    let {code, map, ast} = babel.transform(source, options);
    // return code;
    return this.callback(null, code, map, ast)

}
module.exports = loader