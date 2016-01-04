var express = require('express'),
    http = require('http'),
    React = require('react'),
    util = require('../server/util'),
    fs = require('fs'),
    ReactDOMServer = require('react-dom/server'),
    ReactRouter = require('react-Router'),
    RoutingContext = ReactRouter.RoutingContext,
    app = express(),
    DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script,
    Html = React.createFactory(require('../components/Html.jsx')),
    RouterApp = require('../components/Router.jsx');

//app.use(express.static(__dirname + '/build/'));

app.all('*', function(req, res){
    console.log(req.url);
  if (req.url === '/favicon.ico') {
        util.write('haha', 'text/plain', res);
    } else if (req.url === '/build/bundle.js') {
        // serve JavaScript assets
        console.log('file');
        fs.readFile('.'+ req.url, function(err, data){
            util.write(data, 'text/javascript', res);
        });
    } else {
        // handle all other urls with React Router
        console.log('page');
        ReactRouter.match({routes:RouterApp, location:req.path}, function(error, redirectLocation, renderProps){
            if (error) {
                util.writeError(error.message, res);
            } else if (redirectLocation) {
                util.redirect(redirectLocation, res);
            } else if (renderProps) {
                var output = ReactDOMServer.renderToStaticMarkup(Html({
                    host: '/build/',
                    markup: ReactDOMServer.renderToString(<RoutingContext  {...renderProps}/>)
                }));
                util.write(output, 'text/html', res);
            } else {
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
console.log("Start server with port:8080")