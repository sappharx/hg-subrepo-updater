# updata
[![NPM](
https://nodei.co/npm/updata.png)](
https://nodei.co/npm/updata/)

[![Build Status](
https://img.shields.io/travis/sappharx/hg-subrepo-updater.svg?style=flat-square)](
https://travis-ci.org/sappharx/hg-subrepo-updater)
[![Coverage Status](
https://img.shields.io/coveralls/sappharx/hg-subrepo-updater.svg?style=flat-square)](
https://coveralls.io/github/sappharx/hg-subrepo-updater)
[![Codacy Badge](
https://img.shields.io/codacy/5b9ac87858db4429820bffa8df843a0a.svg?style=flat-square)](
https://www.codacy.com/app/vinnysisk/hg-subrepo-updater)

[![bitHound Overall Score](
https://www.bithound.io/github/sappharx/hg-subrepo-updater/badges/score.svg)](
https://www.bithound.io/github/sappharx/hg-subrepo-updater)
[![bitHound Dependencies](
https://www.bithound.io/github/sappharx/hg-subrepo-updater/badges/dependencies.svg)](
https://www.bithound.io/github/sappharx/hg-subrepo-updater/master/dependencies/npm)
[![bitHound Dev Dependencies](
https://www.bithound.io/github/sappharx/hg-subrepo-updater/badges/devDependencies.svg)](
https://www.bithound.io/github/sappharx/hg-subrepo-updater/master/dependencies/npm)
[![bitHound Code](
https://www.bithound.io/github/sappharx/hg-subrepo-updater/badges/code.svg)](
https://www.bithound.io/github/sappharx/hg-subrepo-updater)

[![License](
https://img.shields.io/:license-mit-blue.svg?style=flat-square)](
http://vsisk.mit-license.org)
[![Commitizen friendly](
https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](
http://commitizen.github.io/cz-cli/)

This is just a little command-line app that updates your mercurial sub-repositories

## Usage
`updata [options]`

  Options:

    -h, --help                output usage information
    -V, --version             output the version number
    -g, --ignore <subrepos>   ignore specified sub-repositories [provide comma-separated list]
    -G, --ignore-file <file>  specify which sub-repositories to ignore in a separate file
    -l, --list <subrepos>     update specified sub-repositories [provide comma-separated list]
    -L, --list-file <file>    specify which sub-repositories to update in a separate file
    -p, --pull-only           only pull latest changes from remote (don't update)
    -q, --quiet               limit console output
    -t, --tag <id>            tag to which to update sub-repositories [defaults to tip]
    -v, --verbose             display output from mercurial


just run `updata` for default behavior (updates all sub-repositories in .hgsub)

## Installation
You need to have node, npm, and hg installed and available on your PATH

run `npm install -g updata` to install globally

## Tests
run tests: `npm run test:once` (not set up for watching right now)

run code coverage: `npm run coverage`

## Contributing
Fork it. Fix or improve it. Submit a pull request.

## License
MIT: http://vsisk.mit-license.org/
