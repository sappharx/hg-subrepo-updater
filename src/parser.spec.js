import test from 'ava';

const parser = require('./parser');

test('ignoreFile() returns empty array when file doesn\'t exist', t => {
    t.same(parser.ignoreFile('foo.txt'), []);
});