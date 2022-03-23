import request from "./request";
import { RegisterPayload, LoginPayload } from "@/typings/user";
//验证
export const validate = () => {
  return request({
    url: "/user/validate",
  });
};
//注册
export const register = (params: RegisterPayload) => {
  return request({
    method: 'post',
    url: "/user/register",
    data:params
  });
};
//登录
export const login = (params: LoginPayload) => {
  return request({
    method: 'post',
    url: "/user/login",
    data:params
  });
};
