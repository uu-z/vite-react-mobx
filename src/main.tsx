import ReactDOM from 'react-dom';
import React from 'react';
import App from './index';
import * as buffer from 'buffer';
(window as any).Buffer = buffer;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
