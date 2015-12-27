
require("babel-core").transform("code", {
  	plugins: ["transform-react-jsx"]
});

// needed when we get the ".jsx" files

/*
require('node-jsx').install({
    extension: '.jsx'
});
*/

var express = require('express');
var http = require('http');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var app = express();
var DOM = React.DOM, body = DOM.body, div = DOM.div, script = DOM.script;
var Test = React.createFactory(require('../components/Html.jsx'));

//app.use(express.static(__dirname + '/build/'));
app.get('/', function(req, res){
   	res.setHeader('Content-Type', 'text/html');
    /*
    var props = {
      items: [
        'Item 0',
        'Item 1',
        'Item </script>',
        'Item <!--inject!-->',
      ]
    }
  */

    var element = React.createElement(Test, {});
    console.log('========== ', element);

    // Return the page to the browser
    res.end(ReactDOMServer.renderToString(element));
});

var server = app.listen(8080);