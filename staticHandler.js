/**
 * Created by lihongyan on 2017/3/17.
 */
var fs =require('fs');
var mime = require('mime');
// var sys = require('sys');
exports.handle =function (req,res) {
    if (req.method !== 'GET') {
        res.writeHead(404, {'Content-Type': 'text-plain'});
        res.end("invalid method" + req.method);
    } else {
        var fname = req.basicserver.container.options.docroot + req.basicserver.urlparsed.pathname;
        if (fname.match(/\/$/)) {
            fname += 'index.html';
        }
        fs.stat(fname, function (err, buf) {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                res.end('file' + fname + "not found" + err);
            } else {
                fs.readFile(fname, function (err, buf) {
                    if (err) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        res.end('file' + fname + "not readable" + err);
                    } else {
                        res.writeHead(200, {
                            'Content-Type': mime.lookup(fname),
                            'Content-Length': buf.length
                        });
                        res.end(buf);
                    }
                });
            }
        })
    }
}