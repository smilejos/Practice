var React = require('react'),
    ReactRouter = require('react-router'),
    Link = ReactRouter.Link,
    marked = require('marked'),
    io = require('socket.io-client');

var socket; // 主要與 Server Side 溝通的窗口

module.exports = React.createClass({
	getInitialState: function() {
		return {
            value: 'Loading',
            title: 'Plase Wait',
            articleNo: 0
        };
	},
	componentDidMount: function() {
	  	socket = io('/Article');
        socket.emit('retrieveArticle', this.props.params.articleNo);
        socket.on('retrieveArticle', this._retrieveArticle);
  	},
    componentWillUnmount: function() {
        socket.disconnect();
    },
    _retrieveArticle: function(Article){
        console.log('client', Article);
        this.setState({
            value: Article.Content,
            title: Article.Title,
            articleNo: Article.ArticleNo,
        });
    },
    _renderMarkup: function() {
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            highlight: function (code, lang) {
                console.log(lang);
                if(lang) {
                    return require('highlight.js').highlight(lang, code).value;    
                } else {
                    return require('highlight.js').highlightAuto(code).value;    
                }
                
            }
        });
        var content = marked(this.state.value);
        return { __html: content};
    },
    _renderTitle: function(){
        return (
            <span>{this.state.title}</span>
        )
    },
    render: function() {
        return (
        	<div>
                <div className="MarkdownModify">
                    <Link to={ "/creation/" + this.state.articleNo }>Modify</Link>
                </div>
                <div className="MarkdownDisplay">
                    <div className="MarkdownTitle">
                        {this._renderTitle()}
                    </div>
                    <div className="markdown-body" dangerouslySetInnerHTML={this._renderMarkup()} /> 
                </div>
            </div>
    	);
    }
})