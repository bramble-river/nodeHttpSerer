/**
 * Created by lihongyan on 2017/3/17.
 */
var http = require('http');
var url = require('url');

exports.createServer = function () {
    var htserver = http.createServer(function (req,res) {
        req.basicserver = {
            urlparsed: url.parse(req.url,true)
        }
        processHeaders(req,res);
        dispatchToContainer(htserver,req,res);
    });
    htserver.basicserver = {
        contains:[]
    };
    htserver.addContainer = function (host,path,module,options) {
        if (lookupContainer(htserver,host,path) !==undefined){
            throw new Error("already mapped" + host +"/" + path);
        }
        htserver.basicserver.contains.push({
            host:host,
            path:path,
            module:module,
            options:options
        })
        return this;
    }
    htserver.useFavIcon = function (host,path) {
        return this.addContainer(host,"/favicon.ico",
            require('./faviconHandler'),
            {iconPath:path}
        );
    }
    htserver.docRoot = function (host,path,rootPath) {
        return this.addContainer(host,path,
            require('./staticHandler'),
            {docroot:rootPath});
    }
    return htserver;
}

var lookupContainer = function (htsever,host,path) {
    for(var i=0;i<htsever.basicserver.contains.length;i++)
    {
        var container = htsever.basicserver.contains[i];
        var hostMatches = host.toLowerCase().match(container.host);
        var pathMatches = path.match(container.path);
        if (hostMatches !== null && pathMatches !== null){
            return{
                container:container,
                host:hostMatches,
                path:pathMatches
            };
        }
    }
    return undefined;
}
var processHeaders = function (req,res) {
    req.basicserver.cookies = [];
    var keys = Object.keys(req.headers);
    for(var i=0,l=keys.length;i<l;i++){
        var hname = keys[i];
        var hval = req.headers[hname];
        if (hname.toLowerCase() === 'host'){
            req.basicserver.host = hval;
        }
        if (hname.toLowerCase() === 'cookie'){
            req.basicserver.cookies.push(hval);
        }
    }
}
var dispatchToContainer = function (htserver,req,res) {
    var container = lookupContainer(htserver,
        req.basicserver.host,
            req.basicserver.urlparsed.pathname
    );
    if (container !== undefined){
        req.basicserver.hostMatches = container.host;
        req.basicserver.pathMatches = container.path;
        req.basicserver.container = container.container;
        container.container.module.handle(req,res);
    }else {
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('no handler found for' + req.host + "/" +req.basicserver.urlparsed.path);
    }
}
