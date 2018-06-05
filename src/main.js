import React from 'react'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import 'core-js/es6/promise' //引入core-js(babel-polyfill) 兼容IE浏览器
import {Provider} from 'react-redux';
import storeConfig from './redux/store'
const { persistor, store } = storeConfig()

import { PersistGate } from 'redux-persist/integration/react'

// Store Initialization
// ------------------------------------

// Render Setup
// ------------------------------------
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const App = require('./routes/App').default
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    ,
    MOUNT_NODE
  )
}

// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (e) {
        console.error(e)
        renderError(e)
      }
    }

    // Setup hot module replacement
    module.hot.accept([
      './routes/App',
    ], () => setImmediate(() => {
      ReactDOM.unmountComponentAtNode(MOUNT_NODE)
      render()
    })
    )
  }
}

// Let's Go!
// ------------------------------------
if (!__TEST__) render()
