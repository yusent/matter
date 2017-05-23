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
    browsers: ['PhantomJS'],
    files: [
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
