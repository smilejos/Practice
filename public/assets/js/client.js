
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var ReactDom = require('react-dom');
var createHistory= require('history').createHistory;
var routes = require('../../components/Router.jsx');

var pathname = window.location.pathname,
	search =  window.location.search,
	search = window.location.search
	location = pathname + search + search;

ReactRouter.match({ routes, location }, function(){
  	React.render(<Router routes={routes} history={createHistory()} />, document.getElementById('app'));
})