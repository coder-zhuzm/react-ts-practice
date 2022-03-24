import * as actionTypes from "../action-types";
import Lesson from "@/typings/lesson";
import { message } from "antd";
import { push } from "connected-react-router";
import { StoreGetState, StoreDispatch } from "../index";
export default {
  addCartItem(lesson: Lesson) {
    return function (dispatch: StoreDispatch) {
      dispatch({
        type: actionTypes.ADD_CART_ITEM,
        payload: lesson,
      });
      message.info("添加课程成功");
    };
  },
  removeCartItem(_id: string) {
    return {
      type: actionTypes.REMOVE_CART_ITEM,
      payload: _id,
    };
  },
  clearCartItems() {
    return {
      type: actionTypes.CLEAR_CART_ITEMS,
    };
  },
  changeCartItemCount(_id: string, count: number) {
    return {
      type: actionTypes.CHANGE_CART_ITEM_COUNT,
      payload: {
        _id,
        count,
      },
    };
  },
  changeCheckedCartItems(checked_Ids: string[]) {
    return {
      type: actionTypes.CHANGE_CHECKED_CART_ITEMS,
      payload: checked_Ids,
    };
  },
  settle() {
    return function (dispatch: StoreDispatch, getState: StoreGetState) {
      dispatch({
        type: actionTypes.SETTLE,
      });
      dispatch(push("/"));
    };
  },
};
