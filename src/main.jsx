import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { Modal, ModalProvider } from './context/Modal';

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

// Get the root element
const container = document.getElementById('root');
const root = createRoot(container); // Create a root

// Render your app
root.render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);

// Development-only window exports
if (import.meta.env.MODE !== 'production') {
  window.store = store;
}