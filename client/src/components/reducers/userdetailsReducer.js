import { SET_USER_DETAILS } from '../actions/action-types/cart-actions'

const initState = {
    userdetails: {}
  };

  export default function(state=initState, action) {
    switch(action.type) {
        case SET_USER_DETAILS:
            return {
                ...state,
                userdetails: action.payload
            }
        default:
            return state;
    }
}