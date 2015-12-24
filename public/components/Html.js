var React = require('react');
module.exports = React.createClass({
    // We initialise its state by using the `props` that were passed in when it
    // was first rendered. We also want the button to be disabled until the
    // component has fully mounted on the DOM
    getInitialState: function() {
        return {};
    },

  // Once the component has been mounted, we can enable the button
    componentDidMount: function() {
        
    },
    render: function() {
        return (
            <div>
            	Hello Jos
        	</div>
        );
    }
});
/*
module.exports = React.createClass({
    render: function render() {
        return React.createElement(
            "div",
            null,
            "Hello World"
        );
    }
});
*/