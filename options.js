'use strict';

let options = require('commander');
let pkg = require('./package.json');

options
    .version(pkg.version)
    .option('-t, --tag <id>', 'tag to update to [defaults to tip]')
    .option('-p, --pull-only', 'only pull latest changes from remote')
    .parse(process.argv);

options.tag = options.tag || 'tip';
options.pullOnly = options.pullOnly || false;

module.exports = options;
