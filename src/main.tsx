import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 확장자를 제거합니다
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
