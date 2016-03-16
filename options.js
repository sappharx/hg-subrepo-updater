'use strict';

let options = require('commander');
let pkg = require('./package.json');

const descriptions = {
    ignore: 'ignore specified sub-repositories [provide comma-separated list]',
    ignoreFile: 'specify which sub-repositories to ignore in a separate file',
    list: 'update specified sub-repositories [provide comma-separated list]',
    listFile: 'specify which sub-repositories to update in a separate file',
    pullOnly: 'only pull latest changes from remote (don\'t update)',
    quiet: 'limit console output',
    tag: 'tag to which to update all sub-repositories [defaults to tip]',
    verbose: 'display output from mercurial',
};

options
    .version(pkg.version)
    .option('-g, --ignore <subrepos>', descriptions.ignore, getList, [])
    .option('-G, --ignore-file <file>', descriptions.ignoreFile, '.updataignore')
    .option('-l, --list <subrepos>', descriptions.list, getList, [])
    .option('-L, --list-file <file>', descriptions.listFile, '.hgsub')
    .option('-p, --pull-only', descriptions.pullOnly)
    .option('-q, --quiet', descriptions.quiet)
    .option('-t, --tag <id>', descriptions.tag, 'tip')
    .option('-v, --verbose', descriptions.verbose)
    .parse(process.argv);

function getList(val) {
    return val.split(',');
}

module.exports = options;
