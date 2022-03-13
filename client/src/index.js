import ReactDOM from 'react-dom';
import './App.scss';

import './index.scss';
import React,{Suspense, lazy} from 'react';

// import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { FaHandHoldingHeart } from 'react-icons/fa';

import { Provider } from "react-redux"
import store from "./app/store"
const App = lazy(() => import('./app/App'))

ReactDOM.render(
 
  <React.StrictMode>
     <Suspense fallback={(<div className="loader-wrapper">
      <div className="loader">

        <div className="loading-svg">
          <FaHandHoldingHeart />

        </div>

      </div>

    </div>)}>
     <Provider store={store}>
    <App />
    </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
