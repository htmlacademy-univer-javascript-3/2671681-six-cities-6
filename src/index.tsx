import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import { Provider } from 'react-redux';
import { store } from './store';
import { checkAuthAction, fetchFavoriteOffersAction, fetchOffersAction } from './store/api-actions';
import MemoizedErrorMessage from './components/ErrorMessage/ErrorMessage';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchFavoriteOffersAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MemoizedErrorMessage />
      <App />
    </Provider>
  </React.StrictMode>
);
