var express = require('express'),
    session = require("express-session");
    http = require('http'),
    React = require('react'),
    util = require('../server/util'),
    fs = require('fs'),
    io = require('socket.io'),
    app = express(),
    ntlm = require('express-ntlm'),
    CommonRouter = require('../server/CommonRouter'),
    ArticleRouter = require('../server/ArticleRouter');
    // ReactDOMServer = require('react-dom/server'),
    // ReactRouter = require('react-Router'),
    // RoutingContext = ReactRouter.RoutingContext,
    // DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script,
    // Html = React.createFactory(require('../components/Html.jsx')),
    // RouterApp = require('../components/Router.jsx');

//app.use(express.static(__dirname + '/build/'));
/*
app.all('*', function(req, res){
    var IdNo = process.env['USERNAME'];
    if (req.url === '/favicon.ico') {
        util.write('haha', 'text/plain', res);
    } else if (req.url === '/build/bundle.js') {
        // serve JavaScript assets
        fs.readFile('.'+ req.url, function(err, data){
            util.write(data, 'text/javascript', res);
        });
    } else if (req.url === '/build/style.css') {
        // serve JavaScript assets
        fs.readFile('.'+ req.url, function(err, data){
            util.write(data, 'text/css', res);
        });
    }else {
        // handle all other urls with React Router
        ReactRouter.match({routes:RouterApp, location:req.path}, function(error, redirectLocation, renderProps){
            if (error) {
                console.log('Router 500');
                util.writeError(error.message, res);
            } else if (redirectLocation) {
                console.log('Router 303');
                util.redirect(redirectLocation, res);
            } else if (renderProps) {
                console.log('Router 200');
                var output = ReactDOMServer.renderToStaticMarkup(Html({
                    host: '/build/',
                    markup: ReactDOMServer.renderToString(<RoutingContext  {...renderProps}/>)
                }));
                util.write(output, 'text/html', res);
            } else {
                console.log('Router 400');
                util.writeNotFound(res);
            }
        });
    }
});
*/

/*
app.use(ntlm({
    debug: function() {
        var args = Array.prototype.slice.apply(arguments);
        console.log.apply(null, args);
    },
    domain: 'inotera',
    domaincontroller: 'ldap://inotera',
}));
*/

app.use(ntlm());
var sessionMiddleware = session({
    secret: 'somesecrettoken'
});

app.use(sessionMiddleware);

app.get('/', function(req, res){
    req.session.user = req.ntlm;
    res.sendfile('./build/index.html');
});

app.get('/bundle.js', function(req, res){
    fs.readFile('./build/bundle.js', function(err, data){
        util.write(data, 'text/javascript', res);
    });
});

app.get('/style.css', function(req, res){
    fs.readFile('./build/style.css', function(err, data){
        util.write(data, 'text/css', res);
    });
});

app.get('/codeStyle.css', function(req, res){
    //fs.readFile('./node_modules/highlight.js/styles/github-gist.css', function(err, data){
    //fs.readFile('./node_modules/highlight.js/styles/vs.css', function(err, data){
    fs.readFile('./node_modules/highlight.js/styles/xcode.css', function(err, data){
        util.write(data, 'text/css', res);
    });
});

app.get('/markdown.css', function(req, res){
    fs.readFile('./node_modules/github-markdown-css/github-markdown.css', function(err, data){
        util.write(data, 'text/css', res);
    });
});

var server = app.listen(8888);
var socket = io.listen(server);

socket.use(function(socket, next){
    sessionMiddleware(socket.request, socket.request.res, next);
});

socket.on('connection', function(client) {          
    console.log('sockets connected', client.id);
    client.on('disconnect', function() {
       console.log('sockets disconnect', client.id);
    });
});

var common = socket.of('/Common');
common.on('connection', function(client){
    CommonRouter.listen(common, client);
});

var article = socket.of('/Article');
article.on('connection', function(client){
    ArticleRouter.listen(client);
});

console.log("Start server with port:8888")