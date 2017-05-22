module.exports = function (config) {
  config.set({
    frameworks: ['mocha', 'browserify'],
    files: ['tests/grid.js'],
    plugins: ['karma-browserify', 'karma-mocha'],
    preprocessors: {
      'tests/grid.js': ['browserify'],
    },
  });
};
