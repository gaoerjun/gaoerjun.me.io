module.exports = exports = {
  release: {
    options: {
      pretty : true
    },
    files: [{
      expand:true,
      cwd:"app/jade",
      src:['*.jade', '**/*.jade', '!model/*.jade', '!variables/*.jade'],
      dest:'dist/html',
      ext: '.html'
    }]
  }
};