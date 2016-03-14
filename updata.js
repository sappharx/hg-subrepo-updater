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

let ignoredRepos = options.ignore;

cat('.hgsub')
    .split('\r\n')
    .filter(line => line.length > 0)
    .map(line => line.split('=')[0].trim())
    .filter(repo => !ignoredRepos.includes(repo))
    .map(path => options.pullOnly
        ? hg.pull(path, logging)
        : hg.update(path, options.tag, logging));
