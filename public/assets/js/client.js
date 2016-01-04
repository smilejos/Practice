
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var ReactDom = require('react-dom');
var createHistory= require('history').createHistory;
var routes = require('../../components/Router.jsx');

var pathname = window.location.pathname,
	search =  window.location.search,
	hash = window.location.hash
	location = pathname + search + hash;

console.log('location', pathname, search, hash);
ReactRouter.match({ routes, location }, function(){
	console.log('location', location);
  	ReactDom.render(<Router routes={routes} history={createHistory()} />, document.getElementById('app'));
})