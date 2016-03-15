'use strict';

const fs = require('fs');
const msg = require('./messages');

if (!fs.existsSync('.hgsub')) {
    console.error(msg.error('no .hgsub file found in directory'));
    process.exit(1);
}

const options = require('./options');
const hg = require('./mercurial');

const logging = {
    verbose: options.verbose,
    quiet: options.quiet
};

let ignoredRepos = options.ignore
    .concat(parseIgnoredSubRepos(options.ignoreFile));

function parseIgnoredSubRepos(ignoreFile) {
    if (!fs.existsSync(ignoreFile)) {
        return [];
    }
    
    return cat(ignoreFile).match(/^([-\w\/]+)(?=\s*)$/mg);
}

cat('.hgsub')
    .match(/^([-\w\/]+)(?=\s*=.*$)/mg)
    .filter(repo => !ignoredRepos.includes(repo))
    .map(path => options.pullOnly
        ? hg.pull(path, logging)
        : hg.update(path, options.tag, logging));
