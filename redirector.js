/**
 * Created by lihongyan on 2017/3/17.
 */

var util = require('util');
var code2url = {
    'ex1':'http://example1.com',
    'ex2':'http://example2.com',
};
var norFound = function (req,res) {
    res.writeHead(404,{'Content-Type':'text-plain'});
    req.end("no matching redirecr code found for" + )
}
exports.handle =function (req,res) {
    if(req.method !== 'GET'){
        res.writeHead(404,{'Content-Type':'text-plain'});
        res.end("invalid method" + req.method);
    }else if(req.basicserver.container.options.iconPath !== undefined){
        fs.readFile(req.basicserver.container.options.iconPath,function (err,buf) {
            if (err){
                res.writeHead(500,{
                    'Content-Type':'text/plain'
                });
                res.end(req.basicserver.container.options.iconPath + "not found");
            }else {
                res.writeHead(200,{
                    'Content-Type':mime.lookup(req.basicserver.container.options.iconPath),
                    'Content-Length':buf.length
                });
                res.end(buf);
            }
        });
    }else {
        res.writeHead(404,{'Content-Type':'text-plain'});
        res.end("no favicon");
    }
};
