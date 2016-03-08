'use strict';

require('shelljs/global');
const fs = require('fs');
const chalk = require('chalk');

if (!fs.existsSync('.hgsub')) {
    console.error(chalk.red.bold('no .hgsub file found in directory'));
    exit(1);
}
    
const options = require('./options');
    
let hgRoot = pwd();

cat('.hgsub')
    .split('\r\n')
    .filter(line => line.length > 0)
    .map(line => line.split('=')[0].trim())
    .map(path => options.pullOnly ? pull(path) : pullAndUpdate(path, options.tag));

function pull(path) {
    cd(path);
    
    echo(chalk.magenta(`pulling changes for ${chalk.green(path)}`));
    exec('hg pull --verbose');
    
    cd(hgRoot);
}

function pullAndUpdate(path, tag) {
    pull(path);
    
    cd(path);

    echo(chalk.magenta(`updating ${chalk.green(path)} to tag: ${chalk.yellow(tag)}`));
    exec(`hg update ${tag}`);
    
    cd(hgRoot);
}
