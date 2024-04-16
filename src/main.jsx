import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './index.css'
import axios from 'axios';

axios.defaults.baseURL = 'https://back-bosco.up.railway.app/'
// axios.defaults.baseURL = 'http://localhost:3001'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
  <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
  </BrowserRouter>
)
