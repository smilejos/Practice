var express = require('express'),
    http = require('http'),
    React = require('react'),
    zlib = require('zlib'),
    fs = require('fs'),
    ReactDOMServer = require('react-dom/server'),
    ReactRouter = require('react-Router'),
    match = ReactRouter.match,
    RoutingContext = ReactRouter.RoutingContext,
    app = express(),
    DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script,
    Html = React.createFactory(require('../components/Html.jsx')),
    MainApp = React.createFactory(require('../components/MainApp.jsx')),
    RouterApp = require('../components/Router.jsx');

//app.use(express.static(__dirname + '/build/'));

app.all('*', function(req, res){
  console.log("=======",req.path);
  if (req.url === '/favicon.ico') {
    write('haha', 'text/plain', res)
  }
  else if (req.url === '/public/bundle.js') {
    // serve JavaScript assets
    fs.readFile('.'+ req.url, function(err, data){
        console.log(data);
        zlib.gzip(data, function(err, result){
            res.writeHead(200, {
              'Content-Length': result.length,
              'Content-Type':'text/javascript',
              'Content-Encoding': 'gzip'
            });
            res.write(result);
            res.end();
        });
    })
  }
  else {
    // handle all other urls with React Router
    match({routes:RouterApp, location:req.path}, function(error, redirectLocation, renderProps){
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            console.log(renderProps);
            var output = ReactDOMServer.renderToStaticMarkup(Html({
                host: '/public/',
                markup: ReactDOMServer.renderToString(<RoutingContext  {...renderProps}/>)
            }));
            res.status(200).send(output);
        } else {
            res.status(404).send('Not found')
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