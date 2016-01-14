var React = require('react');
var marked = require('marked');


//require('../scss/style.scss');
module.exports = React.createClass({
	getInitialState: function() {
    	return {value: 'Type some *markdown* here!'};
  	},
  	componentDidMount: function() {
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
  	rawMarkup: function() {
  		var content = marked(this.state.value);
		console.log(content);
	    return { __html: content};
  	},
    render: function() {
        return (
        	<h3>
        		<div className="MarkdownEditor">
		        <h3>Input</h3>
		        <textarea
		          	onChange={this.handleChange}
		          	ref="textarea"
		          	defaultValue={this.state.value} />
		        <h3>Output</h3>
		        <div className='markdown-body' dangerouslySetInnerHTML={this.rawMarkup()} />
		      </div>
    		</h3>
    	);
    }
});
