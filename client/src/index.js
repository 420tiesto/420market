import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
// import {UseWalletProvider} from 'use-wallet'
import { configureStore } from '@reduxjs/toolkit'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { rootReducer } from './store/reducers/rootReducer'

import * as serviceWorker from './serviceWorker'

import App from './App'
import './index.css'

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware([thunk]),
    devTools: process.env.NODE_ENV !== 'production'
})

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(
    // <UseWalletProvider
    // chainId={42}
    // connectors={{
    //     injected: {

    //     },
    //     walletconnect: {
    //         // rpcUrl: "https://api.infura.io/v1/jsonrpc/kovan"
    //         rpcUrl: "https://kovan.infura.io/v3/55af5fb4b6fd4172a1eecfa69550e259"
    //         // rpcUrl: 'https://mainnet.eth.aragon.network/'
    //     },
    //     walletlink: {
    //         url: 'https://mainnet.eth.aragon.network/',
    //         appName: "Coinbase Wallet",
    //         appLogoUrl: ""
    //     }
    // }}
    // >
    app,
    // </UseWalletProvider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
