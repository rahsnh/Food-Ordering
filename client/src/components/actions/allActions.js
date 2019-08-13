import { FETCH_CART } from './action-types/cart-actions';
import { NEW_TO_CART } from './action-types/cart-actions';
import { CLEAR_CART } from './action-types/cart-actions';
import { SET_CURRENT_USER } from './action-types/cart-actions';
import { SET_USER_DETAILS } from './action-types/cart-actions';
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axios from "axios";

import {
  getFromStorage,
  setInStorage
} from '../../utils/storage';

export const fetchCart = () => {
  var isCartItems = getFromStorage('cart_items');
  return (dispatch) => {
    if (isCartItems) {
      isCartItems.forEach( function(item) {
        item.value = "addFromCart";
        axios.post('/api/usercart/addtocart', item)
          .catch(error => {
            console.log("error in adding to cart");
            throw (error);
          });
      });
      localStorage.removeItem('cart_items');
    }
    return axios.get('/api/usercart/fetchcart')
      .then(response => {
        dispatch(fetchToCart(response.data.cartItem, response.data.cartTotal))
      })
      .catch(error => {
        console.log("error in dispatch");
        throw (error);
      });
  }
}

export const fetchLocalCart = () => dispatch => {
  var oldItems = getFromStorage('cart_items') || [];
  dispatch(fetchToCart(oldItems));
}

export const fetchToCart = (cartItem, cartTotal) => {
  return {
    type: FETCH_CART,
    payload: cartItem,
    cartTotal: cartTotal,
  }
}

export const createCart = (cartItem) => {
  return (dispatch) => {
    axios.get('/api/account/isloggedin')
      .then(response => {
        if (response.data.isloggedin) {
          return axios.post('/api/usercart/addtocart', cartItem)
            .then(response => {
              dispatch(newToCart(response.data.cartItem, response.data.cartTotal))
            })
            .catch(error => {
              console.log("error in dispatch");
              throw (error);
            });
        } else {
          var oldItems = getFromStorage('cart_items') || [];
          var flag = true;
          var deleteIndex = false;
          for (var index = 0; index < oldItems.length; index++) {
            if (oldItems[index].item_id == cartItem.item_id)  {
              if(cartItem.value == 'addNewToCart' || cartItem.value == 'increase') {
                oldItems[index].units += 1;
                oldItems[index].total = cartItem.itemPrice * oldItems[index].units;
              } else if (cartItem.value > 1) {
                oldItems[index].units -= 1;
                oldItems[index].total = cartItem.itemPrice * oldItems[index].units;
              } else if (cartItem.value <= 1) {
                deleteIndex = true;
                oldItems.splice(index,1);
              }
              flag = false;
              break;
            }
          }
          if (flag) {
            var newItem = {
              'item_id': cartItem.item_id,
              'itemName': cartItem.itemName,
              'itemPrice': cartItem.itemPrice,
              'itemType': cartItem.itemType,
              'total': cartItem.itemPrice,
              'units': 1
            }
            oldItems.push(newItem);
          }
          setInStorage('cart_items', oldItems);
          for (var i = 0; i < oldItems.length; i++) {
            dispatch(newToCart(oldItems[i]));
          }
        }
      });
  };
};

export const newToCart = (cartItem, cartTotal) => {
  return {
    type: NEW_TO_CART,
    payload: cartItem,
    cartTotal: cartTotal,
  }
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  }
};

export const loginUser = (token) => {
  localStorage.setItem('Token', token);
  setAuthToken(token);
  const decoded = jwt_decode(token);
  return (dispatch) => {
    dispatch(setCurrentUser(decoded));
    dispatch(fetchCart());
  }
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("Token");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(clearCart());
};

export const addProfile = (profile) => {
  return {
    type: SET_USER_DETAILS,
    payload: profile
  }
}