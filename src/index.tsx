import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';

const offerCount: number = 7;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offerCount={offerCount} />
  </React.StrictMode>
);
