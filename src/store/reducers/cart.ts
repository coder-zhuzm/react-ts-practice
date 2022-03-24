import { AnyAction } from "redux";
import { CartState } from "@/typings/cart";
import * as actionTypes from "@/store/action-types";
let initialState: CartState = [];
export default function (
  state: CartState = initialState,
  action: AnyAction
): CartState {
  switch (action.type) {
    case actionTypes.ADD_CART_ITEM:
      let oldIndex = state.findIndex(
        (item: any) => item.lesson._id === action.payload._id
      );
      if (oldIndex === -1) {
        return [
          ...state,
          {
            checked: false,
            count: 1,
            lesson: action.payload,
          },
        ];
      } else {
        let lesson = state[oldIndex];
        return [
          ...state.slice(0, oldIndex),
          { ...lesson, count: lesson.count + 1 },
          ...state.slice(oldIndex + 1),
        ];
      }
    case actionTypes.REMOVE_CART_ITEM:
      let removeIndex = state.findIndex(
        (item: any) => item.lesson._id === action.payload
      );
      return [...state.slice(0, removeIndex), ...state.slice(removeIndex + 1)];
    case actionTypes.CLEAR_CART_ITEMS:
      return [];
    case actionTypes.CHANGE_CART_ITEM_COUNT:
      return state.map((item: any) => {
        if (item.lesson._id === action.payload._id) {
          item.count = action.payload.count;
        }
        return item;
      });
    case actionTypes.CHANGE_CHECKED_CART_ITEMS:
      let checkedIds = action.payload;
      return state.map((item: any) => {
        if (checkedIds.includes(item.lesson._id)) {
          item.checked = true;
        } else {
          item.checked = false;
        }
        return item;
      });
    case actionTypes.SETTLE:
      return state.filter((item) => !item.checked);
    default:
      return state;
  }
}
