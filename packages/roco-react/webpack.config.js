const webpackMerge = require('webpack-merge');
const commonConfig = require('./build-utils/webpack.common.js');
let  currentConfig = {};
module.exports = ({mode}) => {
    if (mode === 'dev') {
        mode = 'development';
        currentConfig = require('./build-utils/webpack.dev.js');
    }
    return webpackMerge(commonConfig, currentConfig);
}