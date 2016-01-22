var React = require('react'),
    Avatar = require('./Avatar.jsx');
    MaterialUI = require('material-ui'),
    List = MaterialUI.List,
    ListItem = MaterialUI.ListItem;

module.exports = React.createClass({
    _getAvatar: function(url){
        return (
            <div className='MemberImage'>
                <Avatar Id_No={this.props.user.Id_No} />
            </div>
        );
    },
	_handleClick: function() {
        this.props.openChatBox({
            target: this.props.user.SocketId,
            Id_No: this.props.user.Id_No
        });
  	},
    render: function() {
        var AvatarImage = this._getAvatar();
        return (
        	<ListItem
                key={this.props.user.Id_No}
                leftAvatar={ AvatarImage }
                primaryText={this.props.user.Card_Na}
                secondaryText={this.props.user.Title_na} 
                onClick={this._handleClick} />
    	);
    }
});