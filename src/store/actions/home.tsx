import * as TYPES from "../action-types";
import { getSliders, getLessons } from "@/api/home";
export const setCurrentCategory = (currentCategory: string) => {
  return { type: TYPES.SET_CURRENT_CATEGORY, payload: currentCategory };
}

export const getSlidersAction = () => {
  return {
    type: TYPES.GET_SLIDERS,
    payload: getSliders(),
  };
}
export const getLessonsAction = () => {
  return (dispatch: any, getState: any) => {
    (async function () {
      let {
        currentCategory,
        lessons: { hasMore, offset, limit, loading },
      } = getState().home;
      if (hasMore && !loading) {
        dispatch({ type: TYPES.SET_LESSONS_LOADING, payload: true });
        let result: any = await getLessons(currentCategory, offset, limit);
        dispatch({ type: TYPES.SET_LESSONS, payload: result.data });
      }
    })();
  };
}
export const refreshLessonsAction = () => {
  return (dispatch: any, getState: any) => {
    (async function () {
      let {
        currentCategory,
        lessons: { limit, loading },
      } = getState().home;
      if (!loading) {
        dispatch({ type: TYPES.SET_LESSONS_LOADING, payload: true });
        let result: any = await getLessons(currentCategory, 0, limit);
        dispatch({ type: TYPES.REFRESH_LESSONS, payload: result.data });
      }
    })();
  };
}