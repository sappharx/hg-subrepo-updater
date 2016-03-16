'use strict';

let options = require('commander');
let pkg = require('./package.json');

const descriptions = {
    ignore: 'ignore specified sub-repositories [provide comma-separated list]',
    ignoreFile: 'specify which sub-repositories to ignore in a separate file',
    pullOnly: 'only pull latest changes from remote (don\'t update)',
    quiet: 'limit console output',
    tag: 'tag to which to update all sub-repositories [defaults to tip]',
    verbose: 'display output from mercurial',
};

options
    .version(pkg.version)
    .option('-g, --ignore <subrepos>', descriptions.ignore, getList, [])
    .option('-G, --ignore-file <file>', descriptions.ignoreFile, '.updataignore')
    .option('-p, --pull-only', descriptions.pullOnly)
    .option('-q, --quiet', descriptions.quiet)
    .option('-t, --tag <id>', descriptions.tag, 'tip')
    .option('-v, --verbose', descriptions.verbose)
    .parse(process.argv);

function getList(val) {
    return val.split(',');
}

module.exports = options;
