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

const subrepoPattern = /^([-\w\/]+)(?=\s*=)/mg;
let ignoredRepos = options.ignore;

cat('.hgsub')
    .match(subrepoPattern)
    .filter(repo => !ignoredRepos.includes(repo))
    .map(path => options.pullOnly
        ? hg.pull(path, logging)
        : hg.update(path, options.tag, logging));
