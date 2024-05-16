import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { persistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"
import { SocketContextProvider } from './Context/SocketContext';
const root = ReactDOM.createRoot(document.getElementById('root'));

let persiststore = persistStore(store)

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <persistGate persiststore={persiststore}>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </persistGate>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
