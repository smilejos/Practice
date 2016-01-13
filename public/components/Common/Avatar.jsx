var React = require('react');
module.exports = React.createClass({
    render: function() {
        return (
        	<div className="UserAvatar" onClick={this.props.onAvatarClick} >
                <img src={this.props.avatar}/>
            </div>
    	);
    }
})