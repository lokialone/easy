class DonePlugin {
    constructor(options) {
    }

    apply(compiler) {
        compiler.hooks.done.tap('DonePlugin', (compilation) => {
            console.log('Done!!');
        })
    }
}

module.exports=DonePlugin;