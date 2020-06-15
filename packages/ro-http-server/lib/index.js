#!/usr/bin/env node
const roHttpServer = require('./ro-http-server');
const { program } = require('commander');
const config = require('./config');
program.version('0.0.1');
 Object.entries(config).forEach(([key, item]) => {
     program.option(item.option, item.info, item.default);
 })
 
program.parse(process.argv);

const Server = new roHttpServer({port: program.port, host: program.host, directory: program.directory, gzip: program.gzip});
Server.start();