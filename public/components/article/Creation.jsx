var React = require('react'),
    marked = require('marked'),
    io = require('socket.io-client');

var socket; // 主要與 Server Side 溝通的窗口

module.exports = React.createClass({
	getInitialState: function() {
    	return {
    			value: 'Type some *markdown* here!',
    			title: 'Article Title',
                isNewArticle: false
		};
  	},
  	componentDidMount: function() {
        socket = io('/Article');
        
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
				return require('highlight.js').highlight(lang, code).value;
			}
		});

        if(this.props.params.articleNo) {
            this.setState({
                isNewArticle : true  
            })

            socket.emit('retrieveArticle', this.props.params.articleNo);
            socket.on('retrieveArticle', this._retrieveArticle);
        }
  	},
    _retrieveArticle: function(Article){
        this.refs.txtTitle.value = Article.Title;
        this.refs.textarea.value = Article.Content;
        this.setState({
            value: Article.Content,
            title: Article.Title,
        });
    },
  	_handleChange: function() {
    	this.setState({value: this.refs.textarea.value});
  	},
  	_handleTitleChange: function(){
  		this.setState({title: this.refs.txtTitle.value});
  	},
  	_handleKeydown: function(e) {
  		if (e.keyCode === 9) { // tab was pressed
            var val = this.refs.textarea.value,
                start = this.refs.textarea.selectionStart,
                end = this.refs.textarea.selectionEnd;
            this.refs.textarea.value = val.substring(0, start) + '\t' + val.substring(end);
            this.refs.textarea.selectionStart = this.refs.textarea.selectionEnd = start + 1;
            e.preventDefault();
            this.setState({value: this.refs.textarea.value});
        }
  	},
  	_handlePostArticle: function(){
        var Article = {
            Title : this.state.title,
            Author : '',
            Content : this.state.value, 
            Tag : ''
        };

        if( this.state.isNewArticle) {
            Article.ArticleNo = this.props.params.articleNo;
            socket.emit('update', Article);    
        } else {
            socket.emit('publish', Article);    
        }
  	},
  	_renderMarkup: function() {
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
    		<div className="MarkdownEditor">
    			<div className="MarkdownOutput">
    				<div className="MarkdownTitle">
    					{this._renderTitle()}
    				</div>
		        	<div className="markdown-body" dangerouslySetInnerHTML={this._renderMarkup()} />	
		        </div>
    			<div className='MarkdownInput'>
    				<div className="MarkdownTitle">
    					<input type="text" ref="txtTitle" placeholder="Article Title" className="MarkdownTitleInput" onChange={this._handleTitleChange} />
    				</div>
			        <textarea
			         	className="MarkdownArea"
			          	onChange={this._handleChange}
			          	onKeyDown={this._handleKeydown}
			          	ref="textarea"
			          	defaultValue={this.state.value} />
		          	<button ref="btn" className="MarkdownPost" onClick={this._handlePostArticle}>Post</button>
	          	</div>
		    </div>
    	);
    }
});
