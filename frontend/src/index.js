import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router} from 'react-router-dom';
import reducer from './reducers'
import { createStore } from 'redux'
import { Provider, withRouter } from 'react-redux'

require('dotenv').config()

const store = createStore(reducer)

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
