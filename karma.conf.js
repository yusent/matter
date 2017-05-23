module.exports = function (config) {
  config.set({
    files        : ['test_with_browser/**/*.js'],
    frameworks   : ['mocha', 'browserify'],
    plugins      : ['karma-browserify', 'karma-mocha'],
    preprocessors: {'test_with_browser/**/*.js': ['browserify']},
  });
};
