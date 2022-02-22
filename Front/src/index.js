import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AllRoutes from './routes/AllRoutes';

ReactDOM.render(
  <React.StrictMode>
    <div className="flex w-full h-full">
      <AllRoutes />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
