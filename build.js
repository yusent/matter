const browserify = require('browserify');
const fs = require('fs');
const sass = require('node-sass');

sass.render({
  file: 'sass/matter.sass',
  indentedSyntax: true,
  outputStyle: 'expanded',
}, function (renderError, result) {
  if (renderError) {
    console.log(renderError);
  } else {
    fs.writeFile('dist/css/matter.css', result.css, function (writeError) {
      if (writeError) {
        console.log(writeError);
      } else {
        console.log('dist/css/matter.css generated!');
      }
    });
  }
});

browserify('js/matter.js', { standalone: 'Matter' })
  .bundle()
  .on('end', function () {
    console.log('dist/js/matter.js generated!');
  })
  .pipe(
    fs.createWriteStream('dist/js/matter.js')
      .on('error', function (writeError) {
        console.log(writeError);
      })
  );
