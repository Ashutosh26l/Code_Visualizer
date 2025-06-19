import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Import Prism CSS for syntax highlighting
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-cpp';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);