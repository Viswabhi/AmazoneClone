import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux';
import firebaseConfig from './firebase.config.js';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './redux/store.jsx'
import './index.css'
import "slick-carousel/slick/slick.css";

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
</Provider>
    

)
