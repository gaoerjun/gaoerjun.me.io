module.exports = exports = {
  options: {
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
  },
  buildall: {
    options: {
      mangle:true,
      compress:{
        drop_console:true
      },
      report:"min"
    },
    files: [{
      expand:true,
      cwd:"app", //源文件路径
      src:['**/*.js'],   //所有js文件
      dest:'dist'//输出到此目录下
    }]
  }
};