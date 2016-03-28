var React = require('react'),
    Member = require('./common/Member.jsx');

module.exports = React.createClass({
    _handleClick: function(item){
        this.props.openChatBox(item);
    },
    render: function() {
        var self = this;
        var MemberList = this.props.memberList.map(function(user, index){
            return  <Member key={user.Id_No} user={user} openChatBox={self._handleClick} />
        });
        return (
            <div className='MemberList'>
            	{MemberList}
            </div>
    	);
    }
});