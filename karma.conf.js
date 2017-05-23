module.exports = function (config) {
  config.set({
    autoWatch: false,
    browserify: {
      debug: true,
      transform: [
        ['babelify', {
          presets: ['es2015'],
        }],
      ],
    },
    browsers: ['PhantomJS_Desktop'],
    customLaunchers: {
      'PhantomJS_Desktop': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 840,
            height: 1000,
          }
        },
      },
    },
    files: [
      'dist/css/matter.css',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test_with_browser/**/*.js',
    ],
    frameworks: ['mocha', 'browserify'],
    preprocessors: {
      'test_with_browser/**/*.js': ['browserify'],
    },
    reporters: ['spec'],
    singleRun: true,
  });
};
