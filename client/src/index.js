import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import CartReducer from './components/reducers/CartReducer';
import { fetchCart } from './components/actions/cartActions';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(CartReducer, applyMiddleware(thunk));

store.dispatch(fetchCart());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
