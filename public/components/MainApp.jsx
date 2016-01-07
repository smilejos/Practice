var React = require('react'),
    ReactRouter = require('react-router'),
    MaterialUI = require('material-ui'),
    LeftNav = MaterialUI.LeftNav,
    MenuItem = MaterialUI.MenuItem,
    RaisedButton = MaterialUI.RaisedButton,
    Link = ReactRouter.Link;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            isMenuOpen: false 
        };
    },
    handleToggle: function () {
        console.log('click');
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    },
    render: function() {
        return (
            <div>
                <h1>App</h1>
                <RaisedButton label="Menu" onClick={this.handleToggle} />
                <LeftNav open={this.state.isMenuOpen} >
                    <MenuItem onClick={this.handleToggle}><Link to="/about">About</Link></MenuItem>
                    <MenuItem onClick={this.handleToggle}><Link to="/workspace">Workspace</Link></MenuItem>
                </LeftNav>
                <ul>
                    <li></li>
                    <li></li>
                </ul>
                {this.props.children}
            </div>
        );
    }
});