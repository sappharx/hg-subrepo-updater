'use strict';

require('shelljs/global');
const fs = require('fs');

//import { Command } from 'commander';
// let updata = new Command();
let updata = require('commander');

updata
    .version('0.1.0')
    .parse(process.argv);
    
let hgRoot = pwd();

for (let path in getSubRepoPaths()) {
    cd(path);
    
    echo(`pulling changes for ${path}`);
    pullChanges();
    
    cd(root);
}

function getSubRepoPaths() {
    if (fs.existsSync('.hgsub')) {
        let hgsub = cat('.hgsub');
        let paths = hgsub.split('\r\n')
            .filter(line => line.length > 0)
            .map(line => line.split('=')[0].trim()
            );
        //echo(paths);
    } else {
        console.error('no .hgsub file found in directory');
        // might want to throw instead of exit within this function
        exit(1);
    }
}

function pullChanges() {
    exec('hg pull --verbose');
}
