'use strict';

require('shelljs/global');

const fs = require('fs');
const msg = require('./messages');

const pathRegex = /^([-\w\/]+)(?=\s*)$/mg; // there should just be the repo path
const hgsubRegex = /^([-\w\/]+)(?=\s*=.*$)/mg; // path is followed by `= {url}`

const repoPaths = (file, regex) => cat(file).match(regex);

module.exports = {
    ignoreFile: file => fs.existsSync(file) ? repoPaths(file, pathRegex) : [],
    repoPathFile: file => fs.existsSync(file)
            ? repoPaths(file, file === '.hgsub' ? hgsubRegex : pathRegex)
            : null,
};
