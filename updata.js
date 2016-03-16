#!/usr/bin/env node --harmony

'use strict';

const fs = require('fs');
const msg = require('./messages');
const options = require('./options');
const parser = require('./parser');
const hg = require('./mercurial');

const logging = {
    verbose: options.verbose,
    quiet: options.quiet
};

let ignoredRepos = parser.ignoreFile(options.ignoreFile)
    .concat(options.ignore);

let filterIgnoredRepos = repos => options.listFile === '.hgsub' 
    ? repos.filter(repo => !ignoredRepos.includes(repo))
    : repos;

let repoPaths = options.list.length > 0
    ? options.list
    : filterIgnoredRepos(parser.repoPathFile(options.listFile));

if (repoPaths === null) {
    console.error(msg.error(`file (${options.listFile}) not found`));
    options.help();
    process.exit(1);
}

repoPaths
    .map(path => options.pullOnly
        ? hg.pull(path, logging)
        : hg.update(path, options.tag, logging));
