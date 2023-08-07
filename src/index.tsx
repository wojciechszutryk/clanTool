import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './style.reset.css';
import { theme } from './helpers/theme';
import { Provider } from 'react-redux';
import store from './state/store';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
