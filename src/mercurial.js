'use strict';

require('shelljs/global');

const msg = require('./messages');

const hgRoot = pwd();

module.exports = {
    pull,
    update
};

function pull(repo, options) {
    options = options || {};
    
    logIfNotQuiet(msg.cmd(`pulling changes for ${msg.repo(repo)}`), options.quiet);
    
    if (runHgCommand('hg pull --verbose', repo, options.verbose) !== 0) {
        console.error(msg.error(`pull for ${msg.repo(repo)} failed`));
        return false;
    }
    
    return true;
}

function update(repo, tag, options) {
    options = options || {};
    
    if (!pull(repo, options)) {            
        return false;
    }
    
    logIfNotQuiet(msg.cmd(`updating ${msg.repo(repo)} to tag: ${msg.tag(tag)}`), options.quiet);
    
    if (runHgCommand(`hg update ${tag}`, repo, options.verbose) !== 0) {
        console.error(msg.error(`update for ${msg.repo(repo)} failed`));
        return false;
    }
    
    return true;
}

function runHgCommand(command, repo, verbose) {
    if (cd(repo) === null) {
        console.error(msg.error(`sub-repository, ${msg.repo(repo)}, doesn't exist`));
        return 1;
    }
    
    let proc = exec(command, {silent: true});
    
    if (verbose) {
        echo(msg.hg(proc.stdout));
    }
    
    cd(hgRoot);
    
    return proc.code;
}

function logIfNotQuiet(msg, quiet) {
    if (!quiet) {
        echo(msg);
    }
}
