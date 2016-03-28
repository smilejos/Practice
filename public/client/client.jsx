
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var browserHistory = ReactRouter.browserHistory;
var ReactDom = require('react-dom');
var createHistory= require('history').createHistory;
var routes = require('../components/Router.jsx');

//require('../scss/style.scss');
//require("!style!css!sass!../scss/style.scss");
//var css = require("!css!sass!./style.scss");

var pathname = window.location.pathname,
	search =  window.location.search,
	hash = window.location.hash,
	location = pathname + search + hash;

ReactRouter.match({ routes, location }, function(){
  	ReactDom.render(<Router routes={routes} history={browserHistory} />, document.getElementById('app'));
});

