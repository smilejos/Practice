var React = require('react'),
    Avatar = require('./../common/Avatar.jsx');

module.exports = React.createClass({
	_sendMessage: function(){
        this.props.sendMessage({
            target: this.props.target.SocketId,
            sender: this.props.selfUser.Id_No,
            message: this.refs.txtMessage.value,
            dateTime: new DateTime()
        });
        this.refs.txtMessage.value = '';
	},
    _closeChatBox: function(){
        
    },
    _getAvatar: function(){
        return (
            <div className='MemberImage'>
                <Avatar Id_No={this.props.target.Id_No} />
            </div>
        )
    },
    render: function() {
        var AvatarImage = this._getAvatar();
        var lastSender = null;
        var MessageList = this.props.messages.map(function(item, index){
            console.log('index', index);
            if(index == 0) {
                lastSender = item.Id_No;
                return (
                    <div>
                        <MessageSender sender={item.Card_Na} />
                        <MessageText message={item.message} />
                    </div>
                );
            } else if (lastSender != item.Id_No) {
                lastSender = item.Id_No;
                return (
                    <div>
                        <SplitLine />
                        <MessageSender sender={item.Card_Na} />
                        <MessageText message={item.message} />
                    </div>
                );
            } else {
                lastSender = item.Id_No;
                return (
                    <MessageText message={item.message} />
                );
            }
        });
        console.log('chat box target', this.props.target);
        return (
        	<div className="chatBox" >
                <div className='chatTitle'>
                    {AvatarImage}
                    <div className='chatTarget'>{this.props.target.Card_Na}</div>
                    <div className='chatNote'>{this.props.target.Title_na}</div>
                </div>
                <div className='chatContent'>
                    {MessageList}
                </div>
                <div className='chatPostBar'>
                    <input type='text' ref='txtMessage' value='' />
                    <button onClick={this._sendMessage}>Send</button>
                </div>
            </div>
    	);
    }
})


var MessageText = React.createClass({
    render: function() {
        return (
            <div className="message" >{this.props.message}</div>
        );
    }
});

var MessageSender = React.createClass({
    render: function() {
        return (
            <div className="sender">{this.props.sender}</div>
        );
    }
});

var SplitLine = React.createClass({
    render: function() {
        return (
            <div className="splitLine"></div>
        );
    }
});
