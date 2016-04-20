#!/usr/bin/env node --harmony

'use strict';

const fs = require('fs');
const echo = require('shelljs').echo;
const msg = require('./messages');
const options = require('./options');
const parser = require('./parser');
const hg = require('./mercurial');

const logging = {
  verbose: options.verbose,
  quiet: options.quiet,
};

if (!fs.existsSync(options.listFile)) {
  echo(msg.error(`file (${options.listFile}) not found`));
  options.help();
  process.exit(1);
}

const ignoredRepos = parser.ignoreFile(options.ignoreFile)
  .concat(options.ignore);

const filterIgnoredRepos = repos => (options.listFile === '.hgsub'
  ? repos.filter(repo => !ignoredRepos.includes(repo))
  : repos);

const repoPaths = options.list.length > 0
  ? options.list
  : filterIgnoredRepos(parser.repoPathFile(options.listFile));

repoPaths
  .map(path => (options.pullOnly
    ? hg.pull(path, logging)
    : hg.update(path, options.tag, logging)));
