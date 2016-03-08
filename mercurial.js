'use strict';

require('shelljs/global');

const msg = require('./messages');

const hgRoot = pwd();

module.exports = {
    pull,
    update
};

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
