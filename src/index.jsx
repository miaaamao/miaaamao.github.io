import ReactDOM from 'react-dom/client';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import App from './App';
import { muiTheme } from './lib/muiTheme';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={muiTheme}>
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
