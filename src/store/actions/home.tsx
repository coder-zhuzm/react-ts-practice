import * as TYPES from "../action-types";

export const setCurrentCategory = (currentCategory: string) => {
  return { type: TYPES.SET_CURRENT_CATEGORY, payload: currentCategory };
}