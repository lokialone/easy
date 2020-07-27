const babel = require('@babel/core');
function loader(source, sourceMap) {
    let options = {
        presets: ["@babel/preset-env"],
        inputSourceMap: sourceMap,
        sourceMap: true
    }
    let {code, map, ast} = babel.transform(source, options);
    return code;
}
module.exports = loader