let fs = require('fs');
let mkdirp = require('mkdirp');
let sass = require('node-sass');

sass.render({
  file: 'sass/matter.sass',
  indentedSyntax: true,
  outputStyle: 'expanded',
}, function (renderError, result) {
  if (renderError) {
    console.log(renderError);
  } else {
    mkdirp('dist/css', function (mkdirError) {
      if (mkdirError) {
        console.log(mkdirError);
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
  }
});
