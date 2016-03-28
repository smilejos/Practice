var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
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
            });
        }

        socket.on('receiveList', this._receiveList)
  	},
    componentWillUnmount: function() {
        socket.disconnect();
    },
    _receiveList: function(list) {
        this.setState({
            list : list
        });
    },
    _handleClick: function () {
        
    },
    render: function() {
    	var List = this.state.list.map(function(item, index){
            return <ArticleItem key={item.ArticleNo} Article={item}  />
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
        //<div className="ArticleItem" onClick={this._handleClick}></div>
        return (
            <Link to={ "/article/" + this.props.Article.ArticleNo } className="ArticleItem">
                <div className="ArticleTitle">{this.props.Article.Title}</div>
                <div className="ArticleAuthor">{this.props.Article.Author}</div>
            </Link>
        );
    }
});