var React = require('react'),
    ReactRouter = require('react-router'),
    MaterialUI = require('material-ui'),
    io = require('socket.io-client'),
    MemberList = require('../components/MemberList.jsx'),
    LeftNav = MaterialUI.LeftNav,
    MenuItem = MaterialUI.MenuItem,
    RaisedButton = MaterialUI.RaisedButton,
    Link = ReactRouter.Link;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            isMenuOpen: false,
            memberList: []
        };
    },
    componentDidMount: function() {
        var socket = io.connect();
        //socket.emit('checkIn', user.UserName);
        socket.on('receiveRealTimeMember', this.updateMemberList);
        //console.log(user.UserName);
    },
    updateMemberList: function(data) {
        console.log(data.List);
        this.setState({
            memberList : data.List
        });
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
                <MemberList memberList={this.state.memberList} />
                {this.props.children}
            </div>
        );
    }
});