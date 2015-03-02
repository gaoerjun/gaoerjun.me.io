module.exports = exports = {
  server: {
    options: {
      port: 8888,
      open: true,
      livereload: true,
      hostname: (function(){
        var os = require('os'), interfaces = os.networkInterfaces();
        var ipFilter = function(addr) {
          return (addr.family === 'IPv4' && addr.address.match(/^(192|172|10)\./));
        };

        for (var i in interfaces) {
          if (i.match(/^(VirtualBox|VMware)/)) {
            continue;
          }
          var ip = interfaces[i].filter(ipFilter);
          if (ip.length) {
            var hostname = ip.shift().address;
            return hostname;
          }
        }
        return "localhost";
      })()

    }
  }
};