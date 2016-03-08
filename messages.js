'use strict';

const chalk = require('chalk');

module.exports = {
    cmd: msg => chalk.magenta(msg),
    error: msg => chalk.red.bold(msg),
    repo: msg => chalk.green(msg),
    tag: msg => chalk.yellow(msg)
};
