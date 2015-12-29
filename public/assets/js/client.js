
var React = require('react');
var ReactRouter = require('react-router');
var match = ReactRouter.match;
var Router = ReactRouter.Router;
var ReactDom = require('react-dom');
var routes = require('../components/Router.jsx');


const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

// calling `match` is simply for side effects of
// loading route/component code for the initial location
match({ routes, location }, () => {
  render(
    <Router routes={routes} history={createHistory()} />,
    document.getElementById('app')
  )
})