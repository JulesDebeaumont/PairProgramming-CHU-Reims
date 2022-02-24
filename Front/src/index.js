import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AllRoutes from './routes/AllRoutes';
import { Provider } from 'react-redux';
import { store } from './redux';


ReactDOM.render(
  <Provider store={store}>
    <div className="min-h-full bg-[#0E162A] ">
      <AllRoutes />
    </div>
  </Provider>,
  document.getElementById('root')
);
