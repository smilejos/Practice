var express = require('express'),
    http = require('http'),
    React = require('react'),
    util = require('../server/util'),
    fs = require('fs'),
    io = require('socket.io'),
    ReactDOMServer = require('react-dom/server'),
    ReactRouter = require('react-Router'),
    RoutingContext = ReactRouter.RoutingContext,
    app = express(),
    DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script,
    Html = React.createFactory(require('../components/Html.jsx')),
    RouterApp = require('../components/Router.jsx');

//app.use(express.static(__dirname + '/build/'));

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

app.get('/Html', function(req, res){
      res.setHeader('Content-Type', 'text/html');
      var element = React.createElement(Html, {});
      res.end(ReactDOMServer.renderToString(element));
});


var server = app.listen(8080);
var socket = io.listen(server);
socket.sockets.on('connection', function(client) {    

    client.on('send', function(data) {
        socket.emit('receive', data);
    });

    client.on('disconnect', function() {
        console.log('Server has disconnected');
    });
});


console.log("Start server with port:8080")