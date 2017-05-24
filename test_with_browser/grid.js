import assert from 'assert';

let displaySizes = ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'];

let rows = [
  ['xxs1', 'xxs3'],
  ['xs2', 'xs2'],
  ['s2', 's6'],
  ['m10', 'm2'],
  ['l6', 'l6'],
  ['xl10', 'xl2'],
  ['xxl4', 'xxl2', 'xxl6'],
  ['xxxl11', 'xxxl1'],
];

function fits(displaySize) {
  return function (colSize) {
    let _colSize = /[a-z]+/.exec(colSize)[0];
    return displaySizes.indexOf(_colSize) <= displaySizes.indexOf(displaySize);
  };
}

function testSize(size) {
  describe(`grid system when display size is ${size}`, function () {
    describe('column', function () {
      it('displays side by side with siblings when they fit', function () {
        for (let columnSizes of rows) {
          let row = document.createElement('div');
          row.className = 'row';

          for (let columnSize of columnSizes) {
            let col = document.createElement('div');
            col.className = `col ${columnSize}`;
            col.appendChild(document.createTextNode(columnSize));
            row.appendChild(col);
          }

          document.body.appendChild(row);
          let rowRect = row.getBoundingClientRect();

          for (let col of row.childNodes) {
            let colRect = col.getBoundingClientRect();
            let itFits = col.className
              .replace('col ', '')
              .split(/\s/)
              .some(fits(size));

            if (itFits) {
              assert.equal(colRect.top, rowRect.top);
            } else {
              let style = getComputedStyle(col);
              let margin = parseFloat(style.marginLeft);

              assert.equal(row.clientWidth, col.offsetWidth + margin * 2);
            }
          }
        }
      });
    });
  });
}

displaySizes.forEach(testSize);
