// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'tailwindcss/tailwind.css';
import DndProvider from './components/DndProvider';

ReactDOM.render(
  <React.StrictMode>
    <DndProvider>
      <App />
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
