import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { TerraNodeProvider } from './context/TerraNodeContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TerraNodeProvider>
        <App />
      </TerraNodeProvider>
    </BrowserRouter>
  </StrictMode>
);
