/**
 * Created by lihongyan on 2017/3/17.
 */
var port = 4000;
var server = require('./basicserver').createServer();
server.useFavIcon("localhost","./docroot/favicon.ico");
server.docRoot("localhost","/","./docroot");
require('./httpsniffer').sniffOn(server);
server.listen(port);
console.log("aaa");