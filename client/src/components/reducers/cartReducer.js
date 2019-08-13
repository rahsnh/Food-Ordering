import { FETCH_CART } from '../actions/action-types/cart-actions'
import { NEW_TO_CART } from '../actions/action-types/cart-actions'
import { CLEAR_CART } from '../actions/action-types/cart-actions'

const initState = {
  addedItems: [],
  cartTotal: '',
};

export default function(state = initState, action) {
  if (action.type === FETCH_CART) {
    return { ...state, addedItems: action.payload, cartTotal: action.cartTotal };
  } else if (action.type === CLEAR_CART) {
    return { ...state, addedItems: [], cartTotal: '' }
  } else if (action.type === NEW_TO_CART) {
    let existedItem = state.addedItems.find(item => item.item_id === action.payload.item_id);
    let indexItem = state.addedItems.findIndex(item => item.item_id === action.payload.item_id);
    if (existedItem) {
      existedItem.units = action.payload.units;
      existedItem.total = action.payload.total;
      if (existedItem.units == 0) {
        return { ...state, addedItems: [...state.addedItems.slice(0, indexItem), ...state.addedItems.slice(indexItem+1)], cartTotal: action.cartTotal};
      }
      return { ...state, addedItems: [...state.addedItems], cartTotal: action.cartTotal };
    } else {
      return { ...state, addedItems: [...state.addedItems, action.payload], cartTotal: action.cartTotal};
    }
  }
  return state;
}
