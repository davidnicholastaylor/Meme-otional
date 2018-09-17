import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import App from './App';
import Selfware from './components/Selfware'
import "./index.css"

// import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
            <App />
            <Selfware />
        </div>
    </Router>
    ,
    document.getElementById('root'));
registerServiceWorker();
