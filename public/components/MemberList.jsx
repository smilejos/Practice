var React = require('react'),
    Avatar = require('../components/common/Avatar.jsx');
    MaterialUI = require('material-ui'),
    List = MaterialUI.List,
    ListItem = MaterialUI.ListItem;

module.exports = React.createClass({
    _getAvatar: function(url){
        return (
            <div className='MemberImage'>
                <Avatar avatar={url} />
            </div>
        );
    },
    render: function() {
        var self = this;
        var MemberList = this.props.memberList.map(function(user, index){
            var url = 'http://cweb01/HRIS/EmployeePhoto/photo2/'+user.Id_no+'.jpg';
            var AvatarImage = self._getAvatar(url);
            return  <ListItem
                        key={user.Id_no}
                        leftAvatar={ AvatarImage }
                        primaryText={user.Card_Na}
                        secondaryText={user.Title_na} />
        })
        return (
            <div className='MemberList'>
            	{MemberList}
            </div>
    	);
    }
})