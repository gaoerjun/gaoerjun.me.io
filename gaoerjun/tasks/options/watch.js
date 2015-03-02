module.exports = exports = {
  app: {
    files: [
      'app/**/*.js',
      'app/**/*.html',
      'app/less/*.less',
      'app/less/**/*.less',
      'app/jade/**','app/sea-modules/**',
      'tasks/options/*.js'
    ],
    tasks: [
      'clean:build',
      'copy',
      'uglify:buildall',
      'connect',
      'watch'
    ]
  }
};