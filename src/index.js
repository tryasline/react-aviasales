import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './components/redux/redux-store';

import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
