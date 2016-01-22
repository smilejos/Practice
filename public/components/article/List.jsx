var React = require('react'),
    io = require('socket.io-client');

var socket; // 主要與 Server Side 溝通的窗口

module.exports = React.createClass({
	getInitialState: function() {
		return { list : [] };
	},
	componentDidMount: function() {
        var userId = this.props.params.userId;
        socket = io('/Article');
        if( userId ) {
            socket.emit('retrieveList', {
                isSpecificUser : true,
                Id_No : userId
            });
        } else {
            socket.emit('retrieveList', {
                isSpecificUser : false
            })    
        }

        socket.on('receiveList', this._receiveList)
  	},
    _receiveList: function(list) {
        this.setState({
            list : list
        });
    },
    render: function() {
    	var List = this.state.list.map(function(item, index){
            return <ArticleItem key={index} Title={item.Title} Author={item.Author} />
        });
        return (
        	<div className="ArticleList">
                {List}
            </div>
    	);
    }
})


var ArticleItem = React.createClass({
    render: function() {
        return (
            <div className="ArticleItem">
                <div className="ArticleTitle">{this.props.Title}</div>
                <div className="ArticleAuthor">{this.props.Author}</div>
            </div>
        );
    }
});