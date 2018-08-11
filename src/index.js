import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link, Redirect} from 'react-router-dom'

import thunk from 'redux-thunk';
import { createStore, applyMiddleware} from 'redux'
import { Provider } from 'react-redux'
import { routerMiddleware } from 'react-router-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


import Login from './containers/login'
import NoticeBoard from './containers/noticeBoard'
import createHistory from 'history/createBrowserHistory'
import rootReducers from './reducers/rootReducers'
import App from './components/App'
import './styles/App.css';

import client from 'axios'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers)
const history = createHistory()
const thunkWithClient = thunk.withExtraArgument(client)

const store = createStore(persistedReducer, applyMiddleware(routerMiddleware(history), thunkWithClient))
let persistor = persistStore(store)

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component history={history} />
      </PersistGate>
    </Provider>,
    document.getElementById('root'),
  )
}

render(App)
