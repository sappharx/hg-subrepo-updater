'use strict';

require('shelljs/global');
const fs = require('fs');
const msg = require('./messages');

if (!fs.existsSync('.hgsub')) {
    console.error(msg.error('no .hgsub file found in directory'));
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

    echo(msg.cmd(`pulling changes for ${msg.repo(repo)}`));
    let exitCode = exec('hg pull --verbose').code;
    
    cd(hgRoot);
    
    if (exitCode !== 0) {
        console.error(msg.error(`pull for ${msg.repo(repo)} failed`));
        return false;
    }
    
    return true;
}

function update(repo, tag) {
    if (!pull(repo)) {            
        return false;
    }

    cd(repo);

    echo(msg.cmd(`updating ${msg.repo(repo)} to tag: ${msg.tag(tag)}`));
    
    let exitCode = exec(`hg update ${tag}`).code;
    
    cd(hgRoot);
    
    if (exitCode !== 0) {
        console.error(msg.error(`update for ${msg.repo(repo)} failed`));
        return false;
    }
    
    return true;
}
