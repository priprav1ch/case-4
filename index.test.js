const test = require('node:test');
const assert = require('node:assert');
const { sum } = require('./index');

test('adds 1 + 2 to equal 3', () => {
  assert.strictEqual(sum(1, 2), 3);
});
