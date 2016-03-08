'use strict';

require('shelljs/global');
const fs = require('fs');
const chalk = require('chalk');

if (!fs.existsSync('.hgsub')) {
    console.error(errorMessage('no .hgsub file found in directory'));
    exit(1);
}

const options = require('./options');

let hgRoot = pwd();

cat('.hgsub')
    .split('\r\n')
    .filter(line => line.length > 0)
    .map(line => line.split('=')[0].trim())
    .map(path => options.pullOnly ? pull(path) : update(path, options.tag));

function pull(repo) {
    cd(repo);

    echo(chalk.magenta(`pulling changes for ${repoMessage(repo)}`));
    let exitCode = exec('hg pull --verbose').code;
    
    cd(hgRoot);
    
    if (exitCode !== 0) {
        console.error(errorMessage(`pull for ${repoMessage(repo)} failed`));
        return false;
    }
    
    return true;
}

function update(repo, tag) {
    if (!pull(repo)) {            
        return false;
    }

    cd(repo);

    echo(chalk.magenta(`updating ${repoMessage(repo)} to tag: ${tagMessage(tag)}`));
    
    let exitCode = exec(`hg update ${tag}`).code;
    
    cd(hgRoot);
    
    if (exitCode !== 0) {
        console.error(errorMessage(`update for ${repoMessage(repo)} failed`));
        return false;
    }
    
    return true;
}

function errorMessage(message) {
    return chalk.red.bold(message);
}

function repoMessage(repo) {
    return chalk.green(repo);
}

function tagMessage(tag) {
    return chalk.yellow(tag);
}
