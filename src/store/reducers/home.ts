import { AnyAction } from "redux";
import * as TYPES from "../action-types";
import Slider from "@/typings/slider";
import Lesson from "@/typings/lesson";

export interface Lessons {
  loading: boolean;
  list: Lesson[];
  hasMore: boolean;
  offset: number;
  limit: number;
}
export interface HomeState {
  currentCategory: string;
  sliders: Slider[];
  lessons: Lessons;
}

let initialState: HomeState = {
  currentCategory: "all",
  sliders: [],
  lessons: {
    loading: false,
    list: [],
    hasMore: true,
    offset: 0,
    limit: 5,
  },
};
function home(state: HomeState = initialState, action: AnyAction): HomeState {
  switch (action.type) {
    case TYPES.SET_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.payload };
    case TYPES.GET_SLIDERS:
      return { ...state, sliders: action.payload.data };
    case TYPES.SET_LESSONS_LOADING:
      state.lessons.loading = action.payload;
      return state;
    case TYPES.SET_LESSONS:
      return {
        ...state,
        lessons: {
          ...state.lessons,
          loading: false,
          hasMore: action.payload.hasMore,
          list: [...state.lessons.list, ...action.payload.list],
          offset: state.lessons.offset + action.payload.list.length,
        },
      };
    case TYPES.REFRESH_LESSONS:
      state.lessons.hasMore = action.payload.hasMore;
      state.lessons.list = action.payload.list;
      state.lessons.offset = action.payload.list.length;
      return state;
    default:
      return state;
  }
}
export default home;
