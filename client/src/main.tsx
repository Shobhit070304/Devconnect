import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import './index.css';
import AuthContext from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContext>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthContext>
    </BrowserRouter>
  </StrictMode>
);