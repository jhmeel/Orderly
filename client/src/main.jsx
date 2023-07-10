import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, useNavigate} from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import {store, persistor} from './store';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
     <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
         <Router>
         <App />
         </Router>
        
      </SnackbarProvider>
      </PersistGate>
      </Provider>
      </React.StrictMode>
)





