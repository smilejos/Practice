var React = require('react');
//var Personal = require('Personal.jsx');
var Personal = require('../components/Personal.jsx');

module.exports = React.createClass({
    render: function() {
        return (
            <html>
                <head>
                    <meta charSet="utf-8" />
                    <title>Inotera</title>
                </head>
                <body>
                    <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
                    <script src={this.props.host + 'bundle.js'}> </script>
                </body>
            </html>
        );
    }
});