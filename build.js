let fs = require('fs');
let sass = require('node-sass');

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
