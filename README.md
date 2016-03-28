# updata

[![License](
http://img.shields.io/:license-mit-blue.svg?style=flat-square)](
http://vsisk.mit-license.org)

This is just a little command-line app that updates your mercurial sub-repositories

## Usage
Usage: `updata [options]`

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


`updata` for default behavior (updates all sub-repositories in .hgsub)

## Installation
You need to have node, npm, and hg installed and available on your $PATH variable.

*currently*: clone the repo, then run `npm install -g .` from the project root

*future*: create an npm package

## Tests
run tests: `npm test` or `npm t` (this isn't set up for watching right now)

run code coverage: `npm run coverage`

## Contributing
Fork it. Fix or improve it. Submit a pull request.

## License
MIT: http://vsisk.mit-license.org/
