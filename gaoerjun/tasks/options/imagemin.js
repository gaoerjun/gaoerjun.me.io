module.exports = exports = {             // Task
  options : { // Target options
    optimizationLevel : 0
  },
  dynamic: {                             // Another target
    files: [{
      expand: true,                      // Enable dynamic expansion
      cwd: 'src/images',                 // Src matches are relative to this path
      src: ['*.{png,jpg,gif}'],          // Actual patterns to match
      dest: 'dist/images'                // Destination path prefix
    }]
  }
};