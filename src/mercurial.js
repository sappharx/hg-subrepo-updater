const cd = require('shelljs').cd
const echo = require('shelljs').echo
const exec = require('shelljs').exec
const pwd = require('shelljs').pwd

const msg = require('./messages')

const hgRoot = pwd()

function runHgCommand (command, repo, verbose) {
  if (cd(repo) === null) {
    echo(msg.error(`sub-repository, ${msg.repo(repo)}, doesn't exist`))
    return 1
  }

  const proc = exec(command, { silent: true })

  if (verbose) {
    echo(msg.hg(proc.stdout))
  }

  cd(hgRoot)

  return proc.code
}

function logIfNotQuiet (message, quiet) {
  if (!quiet) {
    echo(message)
  }
}

function pull (repo, options = {}) {
  logIfNotQuiet(msg.cmd(`pulling changes for ${msg.repo(repo)}`), options.quiet)

  if (runHgCommand('hg pull --verbose', repo, options.verbose) !== 0) {
    echo(msg.error(`pull for ${msg.repo(repo)} failed`))
    return false
  }

  return true
}

function update (repo, tag, options = {}) {
  if (!pull(repo, options)) {
    return false
  }

  logIfNotQuiet(msg.cmd(`updating ${msg.repo(repo)} to tag: ${msg.tag(tag)}`), options.quiet)

  if (runHgCommand(`hg update ${tag}`, repo, options.verbose) !== 0) {
    echo(msg.error(`update for ${msg.repo(repo)} failed`))
    return false
  }

  return true
}

module.exports = {
  pull,
  update
}
