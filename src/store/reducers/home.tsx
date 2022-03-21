import { AnyAction } from 'redux';
import * as TYPES from "../action-types";
export interface HomeState {
  currentCategory: string;
}
let initialState: HomeState = {
  currentCategory: 'all'
};
export default function (state: HomeState = initialState, action: AnyAction): HomeState {
  switch (action.type) {
    case TYPES.SET_CURRENT_CATEGORY: return { ...state, currentCategory: action.payload };
    default:
      return state;
  }
}