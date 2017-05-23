let assert = require('assert');

describe('mocha tests', function () {
  it('has document', function () {
    let div = document.createElement('div');
    assert.equal(div.nodeName, 'DIV');
  });
});
