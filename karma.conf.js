module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
      'src/inverted-index.js',
      'spec/*.js'
    ],
    plugins: [
      'karma-chrome-launcher',
      require.resolve('./')
    ],

    browsers: ['chrome']
  })
}