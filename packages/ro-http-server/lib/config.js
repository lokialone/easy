const config = {
    port: {
        option: '-p, --port <value>',
        default: '9000',
        info: 'set port'
    },
    directory: {
        option: '-d, --directory <value>',
        default: process.cwd(),
        info: 'choose directory'
    },
    host: {
        option: '-h, --host <value>',
        default: 'localhost',
        info: 'set host'
    },
    gzip: {
        option: '-g, --gzip <value>',
        default: 'true',
        info: 'support gzip'
    }
}

module.exports = config;