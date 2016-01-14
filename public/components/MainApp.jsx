var React = require('react'),
    ReactRouter = require('react-router'),
    MaterialUI = require('material-ui'),
    io = require('socket.io-client'),
    MemberList = require('../components/MemberList.jsx'),
    LeftNav = MaterialUI.LeftNav,
    MenuItem = MaterialUI.MenuItem,
    RaisedButton = MaterialUI.RaisedButton,
    Link = ReactRouter.Link;

var socket; // 主要與 Server Side 溝通的窗口

module.exports = React.createClass({
    getInitialState: function() {
        return {
            isMenuOpen: false,
            memberList: [],
            chatChannel: {}
        };
    },
    componentDidMount: function() {
        socket = io.connect();
        socket.on('receiveRealTimeMember', this._updateMemberList);
    },
    _updateMemberList: function(data) {
        console.log(data.List);
        this.setState({
            memberList : data.List
        });
    },
    _receiveMessage: function(item){
        console.log(item);
        var _chatChannel = this.state.chatChannel;
        if(_chatChannel[item.Sender]) {
            var item = {
                isOpen : true,
                Message : this.state.chatChannel[item].splice(item.Message)
            };
            _chatChannel[item.Sender] = item;
            this.setState({
                chatChannel : _chatChannel
            });
        }
    },
    _sendMessage: function(item){
        socket.emit('sendMessage', item);
    },
    _handleToggle: function () {
        console.log('click');
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    },
    render: function() {
        return (
            <div>
                <h1>App</h1>
                <RaisedButton label="Menu" onClick={this._handleToggle} />
                <LeftNav open={this.state.isMenuOpen} >
                    <MenuItem onClick={this._handleToggle}><Link to="/about">About</Link></MenuItem>
                    <MenuItem onClick={this._handleToggle}><Link to="/workspace">Workspace</Link></MenuItem>
                </LeftNav>
                <MemberList memberList={this.state.memberList} />
                {this.props.children}
            </div>
        );
    }
});