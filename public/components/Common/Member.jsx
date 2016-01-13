var React = require('react'),
    Avatar = require('../common/Avatar.jsx');

module.exports = React.createClass({
	onAvatarClick: function() {
	    
  	},
    render: function() {
        var url = 'http://cweb01/HRIS/EmployeePhoto/photo2/'+this.props.user.Id_no+'.jpg';
        return (
        	<div className='Member'>
                <div>
                    <Avatar avatar={url} onAvatarClick={this.onAvatarClick} />
                </div>
                <div>
                    <div className='Name'>{this.props.user.Card_Na}</div>
                    <div className='Title'>{this.props.user.Title_na}</div>
                </div>
        	</div>
    	);
    }
})