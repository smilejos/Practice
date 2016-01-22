var React = require('react'),
    ReactRouter = require('react-router'),
    MaterialUI = require('material-ui'),
    io = require('socket.io-client'),
    CannelHandler = require('../client/ChannelHandler'),
    MemberList = require('./MemberList.jsx'),
    ChatChannel = require('./chat/ChatChannel.jsx'),
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
            chatChannel: [],
            selfUser: {}
        };
    },
    componentDidMount: function() {
        socket = io.connect();
        socket.on('receiveRealTimeMember', this._updateMemberList);
        socket.on('openChat', this._receiveChatBoxOpen);
    },
    _updateMemberList: function(data) {
        this.setState({
            memberList : data.list,
            selfUser : data.self
        });
    },
    _handleChatBoxOpen: function(item){
        console.log('send open', item);
        socket.emit('openChat', item);
        CannelHandler.setChannels(this.state.chatChannel);
        CannelHandler.openChatBox(item.Id_No);
        this.setState({
            chatChannel : CannelHandler.getChannels()
        });
    },
    _receiveChatBoxOpen: function(item){
        console.log('receive open', item);
        CannelHandler.setChannels(this.state.chatChannel);
        CannelHandler.openChatBox(item.Id_No);
        this.setState({
            chatChannel : CannelHandler.getChannels()
        });  
    },
    _sendMessage: function(message){
        console.log('send message', message)
        socket.emit('sendMessage', message);
        CannelHandler.setChannels(this.state.chatChannel);
        CannelHandler.postMessage(message);
        this.setState({
            chatChannel : CannelHandler.getChannels()
        });
    },
    _receiveMessage: function(message){
        console.log(message);
        CannelHandler.setChannels(this.state.chatChannel);
        CannelHandler.receiveMessage(message);
        this.setState({
            chatChannel : CannelHandler.getChannels()
        });
    },
    _handleLogin: function(){
        socket.emit('login', {
            IdNo: this.refs.txtIdNo.value
        });
    },
    _handleToggle: function () {
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        });
    },
    render: function() {
        console.log(this.state.chatChannel);
        return (
            <div>
                <h1>App</h1>
                <RaisedButton label="Menu" onClick={this._handleToggle} />
                <LeftNav open={this.state.isMenuOpen} >
                    <MenuItem onClick={this._handleToggle}><Link to="/about">About</Link></MenuItem>
                    <MenuItem onClick={this._handleToggle}><Link to="/creation">Creation</Link></MenuItem>
                    <MenuItem onClick={this._handleToggle}><Link to="/article">Article</Link></MenuItem>
                    <MenuItem onClick={this._handleToggle}><Link to="/article/N81101">N81101</Link></MenuItem>
                    <MenuItem onClick={this._handleToggle}><Link to="/article/E10441">E10441</Link></MenuItem>
                </LeftNav>
                <MemberList memberList={this.state.memberList} openChatBox={this._handleChatBoxOpen} />
                <ChatChannel 
                    channels={this.state.chatChannel} 
                    memberList={this.state.memberList} 
                    selfUser={this.state.selfUser}
                    sendMessage={this._sendMessage} />
                <input type='text' ref='txtIdNo' />
                <button onClick={this._handleLogin} >login</button>
                {this.props.children}
            </div>
        );
    }
});