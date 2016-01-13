var React = require('react'),
    Avatar = require('../components/common/Avatar.jsx');
    MaterialUI = require('material-ui'),
    List = MaterialUI.List,
    ListItem = MaterialUI.ListItem;

module.exports = React.createClass({
    render: function() {
        var MemberList = this.props.memberList.map(function(user, index){
            var url = 'http://cweb01/HRIS/EmployeePhoto/photo2/'+user.Id_no+'.jpg';
            return  <ListItem
                        leftAvatar={ <Avatar avatar={url} /> }
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