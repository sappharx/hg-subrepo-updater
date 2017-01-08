import test from 'ava'

const parser = require('./parser')

test('ignoreFile() returns empty array when file doesn\'t exist', t => {
  t.deepEqual(parser.ignoreFile('foo.txt'), [])
})
