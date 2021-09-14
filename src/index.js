import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import './styles/reset.css';

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.querySelector('.root')
)