var React = require('react'),
    marked = require('marked'),
    io = require('socket.io-client');

var socket; // 主要與 Server Side 溝通的窗口

module.exports = React.createClass({
	getInitialState: function() {
    	return {
    			value: 'Type some *markdown* here!',
    			title: 'Article Title'
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
  	},
  	handleChange: function() {
    	this.setState({value: this.refs.textarea.value});
  	},
  	handleTitleChange: function(){
  		this.setState({title: this.refs.txtTitle.value});
  	},
  	handleKeydown: function(e) {
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
  	handlePostArticle: function(){
        var Article = {
            Title : this.state.title,
            Author : '',
            Content : this.state.value, 
            Tag : ''
        };

        socket.emit('publish', Article)
  	},
  	renderMarkup: function() {
  		var content = marked(this.state.value);
	    return { __html: content};
  	},
  	renderTitle: function(){
  		return (
  			<span>{this.state.title}</span>
		)
  	},
    render: function() {
        return (
    		<div className="MarkdownEditor">
    			<div className="MarkdownOutput">
    				<div className="MarkdownTitle">
    					{this.renderTitle()}
    				</div>
		        	<div className="markdown-body" dangerouslySetInnerHTML={this.renderMarkup()} />	
		        </div>
    			<div className='MarkdownInput'>
    				<div className="MarkdownTitle">
    					<input type="text" ref="txtTitle" placeholder="Article Title" className="MarkdownTitleInput" onChange={this.handleTitleChange} />
    				</div>
			        <textarea
			         	className="MarkdownArea"
			          	onChange={this.handleChange}
			          	onKeyDown={this.handleKeydown}
			          	ref="textarea"
			          	defaultValue={this.state.value} />
		          	<button ref="btn" className="MarkdownPost" onClick={this.handlePostArticle}>Post</button>
	          	</div>
		    </div>
    	);
    }
});
