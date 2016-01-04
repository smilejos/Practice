var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link;

module.exports = React.createClass({
    render: function() {
        console.log('render');
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
});