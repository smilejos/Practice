require('babel-core/register');
/*
require("babel-core").transform("code", {
  	plugins: ["transform-react-jsx"]
});
*/
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
var Test = React.createFactory(require('../components/Html'));

//app.use(express.static(__dirname + '/build/'));
app.get('/', function(req, res){
 	res.setHeader('Content-Type', 'text/html')

    // `props` represents the data to be passed in to the React component for
    // rendering - just as you would pass data, or expose variables in
    // templates such as Jade or Handlebars.  We just use some dummy data
    // here (with some potentially dangerous values for testing), but you could
    // imagine this would be objects typically fetched async from a DB,
    // filesystem or API, depending on the logged-in user, etc.
    var props = {
      items: [
        'Item 0',
        'Item 1',
        'Item </script>',
        'Item <!--inject!-->',
      ]
    }

    // Here we're using React to render the outer body, so we just use the
    // simpler renderToStaticMarkup function, but you could use any templating
    // language (or just a string) for the outer page template
    var html = ReactDOMServer.renderToStaticMarkup(body(null,

      // The actual server-side rendering of our component occurs here, and we
      // pass our data in as `props`. This div is the same one that the client
      // will "render" into on the browser from browser.js
      div({id: 'content', dangerouslySetInnerHTML: {__html:
        	//ReactDOMServer.renderToString(Test(props))
        	ReactDOMServer.renderToString(Test)
      }}),

      // Then the browser will fetch and run the browserified bundle consisting
      // of browser.js and all its dependencies.
      // We serve this from the endpoint a few lines down.
      script({src: '/bundle.js'})
    ));

    // Return the page to the browser
    res.end(html)
});

var server = app.listen(8080);