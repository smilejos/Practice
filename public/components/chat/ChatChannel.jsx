var React = require('react'),
    ChatBox = require('./ChatBox.jsx');

module.exports = React.createClass({
    _sendMessage: function(){
        
    },
    _closeChatBox: function(){
        
    },
    _getSpecificUser: function(Id_No){
        return this.props.memberList.filter(function(item){
            return item.Id_No == Id_No;
        })[0];
    },
    render: function() {
        var self = this;
        var channelList = this.props.channels.filter(function(item){
            item.targetUser = self._getSpecificUser(item.Id_No);
            if(item.isOpen){
                return item;
            }
        });

        var components = channelList.map(function(item, index){
             return <ChatBox 
                    key={item.Id_No}
                    messages={item.message} 
                    target={item.targetUser} 
                    selfUser={self.props.selfUser}
                    sendMessage={self._sendMessage} />
        });
        return (
        	<div className="channel" >
                {components}
            </div>
    	);
    }
});