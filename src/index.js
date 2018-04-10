import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Root from './root'

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();