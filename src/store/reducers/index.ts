import { ReducersMapObject, Reducer } from "redux";
import { connectRouter } from "connected-react-router";
import history from "../history";
import home from "./home";
import mine from "./mine";
import profile from "./profile";
import cart from "./cart";
import { combineReducers } from "redux-immer";
import produce from "immer";
let reducers: ReducersMapObject = {
  router: connectRouter(history),
  home,
  mine,
  cart,
  profile,
};
type CombinedState = {
  [key in keyof typeof reducers]: ReturnType<typeof reducers[key]>;
};
let reducer: Reducer<CombinedState> = combineReducers(produce, reducers);

export type { CombinedState };
export default reducer;
