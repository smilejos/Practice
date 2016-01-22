var React = require('react'),
    marked = require('marked'),
    io = require('socket.io-client');

var socket; // 主要與 Server Side 溝通的窗口

module.exports = React.createClass({
	getInitialState: function() {
		return null;
	},
	componentDidMount: function() {
        var articleId = this.props.params.articleId;
	  	socket = io('/Article');
  	},
    render: function() {
        return (
        	<h3>Article:{userId}</h3>
    	);
    }
})