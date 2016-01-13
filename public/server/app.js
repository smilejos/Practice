var express = require('express'),
    session = require("express-session");
    http = require('http'),
    React = require('react'),
    util = require('../server/util'),
    fs = require('fs'),
    io = require('socket.io'),
    app = express(),
    ntlm = require('express-ntlm'),
    MemberControler = require('../server/MemberControler');
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

MemberControler.initialize();

var server = app.listen(8080);
var socket = io.listen(server);

socket.use(function(socket, next){
    sessionMiddleware(socket.request, socket.request.res, next);
});

socket.sockets.on('connection', function(client) {        
    var user = client.request.session.user;
    var IdNo = user.UserName;
    
    MemberControler.setOnline(IdNo);
    socket.emit('receiveRealTimeMember', {
        List :  MemberControler.getOnlineList()
    });
    
    client.on('disconnect', function() {
        MemberControler.setOffline(IdNo);
        socket.emit('receiveRealTimeMember', {
            List :  MemberControler.getOnlineList()
        });
    });
});

console.log("Start server with port:8080")