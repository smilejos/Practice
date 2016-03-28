var React = require('react'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,

    MainApp = require('../components/MainApp.jsx'),
    Default = require('../components/Default.jsx'),
    About = require('../components/About.jsx'),
    List = require('../components/article/List.jsx'),
    Article = require('../components/article/Article.jsx'),
    Creation= require('../components/article/Creation.jsx');

var routes = (
	<Route path="/" component={MainApp} >
		<IndexRoute component={Default} />
        <Route path="about" component={About}/>
        <Route path="creation" component={Creation}/>
        <Route path="creation/:articleNo" component={Creation}/>
        <Route path="list" component={List} />
        <Route path="list/:userId" component={List}/>
        <Route path="article/:articleNo" component={Article}/>
    </Route>
);

module.exports = routes;