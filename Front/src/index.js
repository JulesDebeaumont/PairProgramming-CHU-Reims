import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AllRoutes from './routes/AllRoutes';
import { Provider } from 'react-redux';
import { store } from './redux';


ReactDOM.render(
  <Provider store={store}>
    <div className="flex w-full h-full">
      <AllRoutes />
    </div>
  </Provider>,
  document.getElementById('root')
);
