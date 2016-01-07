var React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    MainApp = require('../components/MainApp.jsx'),
    Default = require('../components/Default.jsx'),
    AboutView = require('../components/About.jsx'),
    WorkspaceView = require('../components/Workspace.jsx');

var routes = (
	<Route path="/" component={MainApp} >
		<IndexRoute component={Default} />
        <Route path="about" component={AboutView}/>
        <Route path="workspace" component={WorkspaceView}/>
    </Route>
);

module.exports = routes;

