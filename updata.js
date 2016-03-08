'use strict';

require('shelljs/global');
const fs = require('fs');
const chalk = require('chalk');

if (!fs.existsSync('.hgsub')) {
    console.error(chalk.red.bold('no .hgsub file found in directory'));
    exit(1);
}

//import { Command } from 'commander';
// let updata = new Command();
let updata = require('commander');

updata
    .version('0.1.0')
    .option('-t, --tag <id>', 'tag to update to [defaults to tip]')
    .option('-p, --pull-only', 'only pull latest changes from remote')
    .parse(process.argv);

updata.tag = updata.tag || 'tip';
    
let hgRoot = pwd();

cat('.hgsub')
    .split('\r\n')
    .filter(line => line.length > 0)
    .map(line => line.split('=')[0].trim())
    .map(path => updata.pullOnly ? pull(path) : pullAndUpdate(path, updata.tag));

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
