import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  userReducerLogout,
  userReducerProfile,
  userReducerSignIn,
  userReducerSignUp,
} from "./reducers/userReducer";
import { feedbackHandler } from "./reducers/feedBackReducer";

//combine reducers
const reducer = combineReducers({
  signIn: userReducerSignIn,
  signUp: userReducerSignUp,
  logOut: userReducerLogout,
  userProfile: userReducerProfile,
  feedBack: feedbackHandler,
});

//initial state
let initialState = {
  signIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
