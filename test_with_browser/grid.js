let assert = require('assert');
let rows = [
  ['xxs1', 'xxs3'],
  ['s2', 's6'],
  ['m10', 'm2'],
];

describe('grid system', function () {
  describe('mt-column', function () {
    it('displays side by side with siblings when they fit', function () {
      rows.forEach(function (sizes) {
        let row = document.createElement('div');
        row.className = 'mt-row';

        sizes.forEach(function (size) {
          let col = document.createElement('div');
          col.className = `mt-col mt-${size}`;
          col.appendChild(document.createTextNode(size));
          row.appendChild(col);
        });

        document.body.appendChild(row);
        let rowRect = row.getBoundingClientRect();

        for (let col of row.childNodes) {
          let colRect = col.getBoundingClientRect();
          assert.equal(colRect.top, rowRect.top);
        }
      });
    });
  });
});
