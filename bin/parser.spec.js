'use strict';

var _ava = require('ava');

var _ava2 = _interopRequireDefault(_ava);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parser = require('./parser');

(0, _ava2.default)('ignoreFile() returns empty array when file doesn\'t exist', t => {
    t.same(parser.ignoreFile('foo.txt'), []);
});
//# sourceMappingURL=parser.spec.js.map