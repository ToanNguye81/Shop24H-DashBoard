import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import reducer from "./reducers";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { SnackbarProvider } from 'notistack';

const store = createStore(reducer, applyMiddleware(thunk));

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <SnackbarProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </HelmetProvider>
);

reportWebVitals();
