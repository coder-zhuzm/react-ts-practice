import request from "./request";

//验证
export const getSliders = () => {
  return request({
    url: "/slider/list",
  });
};

export const getLessons = (
  currentCategory: string = "all",
  offset: number,
  limit: number
) => {
  return request(
    `/lesson/list?category=${currentCategory}&offset=${offset}&limit=${limit}`
  );
};
export function getLessonByidAction(id: string) {
  return request(`/lesson/${id}`);
}
