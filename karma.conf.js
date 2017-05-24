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
    client: {
      args: ['--grep', config.grep],
    },
    customLaunchers: {
      'PhantomJS_XXS': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 479,
            height: 1000,
          },
        },
      },
      'PhantomJS_XS': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 480,
            height: 1000,
          },
        },
      },
      'PhantomJS_S': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 600,
            height: 1000,
          },
        },
      },
      'PhantomJS_M': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 840,
            height: 1000,
          },
        },
      },
      'PhantomJS_L': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 960,
            height: 1000,
          },
        },
      },
      'PhantomJS_XL': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 1280,
            height: 1000,
          },
        },
      },
      'PhantomJS_XXL': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 1440,
            height: 1000,
          },
        },
      },
      'PhantomJS_XXXL': {
        base: 'PhantomJS',
        options: {
          viewportSize: {
            width: 1600,
            height: 1000,
          },
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
