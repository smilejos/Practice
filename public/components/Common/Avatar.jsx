var React = require('react');
module.exports = React.createClass({
    render: function() {
    	var url = 'http://cweb01/HRIS/EmployeePhoto/photo2/'+this.props.Id_No+'.jpg';
        return (
        	<div className="UserAvatar" onClick={this.props.onAvatarClick} >
                <img src={url}/>
            </div>
    	);
    }
})