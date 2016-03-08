'use strict';

let options = require('commander');
let pkg = require('./package.json');

options
    .version(pkg.version)
    .option('-t, --tag <id>', 'tag to which to update [defaults to tip]')
    .option('-p, --pull-only', 'only pull latest changes from remote')
    .option('-v, --verbose', 'display output from mercurial')
    .option('-q, --quiet', 'limit console output')
    .parse(process.argv);

const defaults = {
    tag: 'tip',
    pullOnly: false,
    verbose: false,
    quiet: false
};

module.exports = Object.assign({}, defaults, options);
