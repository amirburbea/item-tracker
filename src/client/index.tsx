import * as React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import * as webFontLoader from 'webfontloader';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import rootSaga from './saga';
import App from './app';

webFontLoader.load({
  google: {
    families: ['Material Icons'],
  },
});

import './roboto.css';
import './index.scss';

const sagaMiddleware = createSagaMiddleware();
const loggerMiddleware = createLogger();
const store = createStore(reducer, applyMiddleware(sagaMiddleware, loggerMiddleware));
sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

