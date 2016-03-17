'use strict';

require('shelljs/global');

const fs = require('fs');
const msg = require('./messages');

const pathRE = /^([-\w\/]+)(?=\s*)$/mg; // there should just be the repo path
const hgsubRE = /^([-\w\/]+)(?=\s*=.*$)/mg; // path is followed by `= {url}`

const repoPaths = (file, regex) => cat(file).match(regex);

module.exports = {
    ignoreFile: file => fs.existsSync(file) ? repoPaths(file, pathRE) : [],
    repoPathFile: file => repoPaths(file, file === '.hgsub' ? hgsubRE : pathRE),
};
