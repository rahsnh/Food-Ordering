import { combineReducers } from "redux";
import authReducer from "./authReducer";
import cartReducer from "./cartReducer";
import userdetailsReducer from "./userdetailsReducer";
export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
  profile: userdetailsReducer
});