var React = require('react'),
    io = require('socket.io-client');

var socket; // 主要與 Server Side 溝通的窗口

module.exports = React.createClass({
	getInitialState: function() {
		return null;
	},
	componentDidMount: function() {
	  	var userId = this.props.params.userId;
  	},
    render: function() {
    	
    	console.log(userId);
        return (
        	<h3>Article:{userId}</h3>
    	);
    }
})