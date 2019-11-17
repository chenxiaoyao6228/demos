#!/usr/bin/env node

let path = require('path');

let config = require(path.resolve(process.cwd(), 'webpack.config.js'));
console.log(config);

let Compiler = require('../lib/Compiler.js');

let compiler = new Compiler(config);

compiler.run();
