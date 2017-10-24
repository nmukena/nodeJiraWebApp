import React from 'react'; //imports React and allows us to use the components
import ReactDOM from 'react-dom'; //throws react code onto browser
import App from './app.jsx'; //component is an independent reusable piece of UI

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

