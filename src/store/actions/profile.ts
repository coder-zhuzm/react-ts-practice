import * as TYPES from "../action-types";
import { validate, register, login } from "../../api/profile";
import { Toast } from "antd-mobile";
import {
  RegisterPayload,
  LoginPayload,
  // RegisterResult,
  // LoginResult,
} from "@/typings/user";
export const validateAction = async () => {
  let result: any = await validate();
  if (result.success) {
    Toast.show({
      icon: "success",
      content: "已登录",
    });
  } else {
    // Toast.show({
    //   icon: "fail",
    //   content: '未登录',
    // });
    console.log("未登录"); //暂无操作
  }
  return {
    type: TYPES.VALIDATE,
    payload: result,
  };
};
export const registerAction = async (values: RegisterPayload) => {
  let result: any = await register(values);
  if (result.success) {
    Toast.show({
      icon: "success",
      content: "注册成功",
    });
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  } else {
    Toast.show({
      icon: "fail",
      content: result.message,
    });
  }
  return {
    type: TYPES.VALIDATE,
    payload: result,
  };
};
export const loginAction = async (values: LoginPayload) => {
  let result: any = await login(values);
  if (result.success) {
    Toast.show({
      icon: "success",
      content: "登录成功",
    });
    sessionStorage.setItem("access_token", result.data.token);
    setTimeout(() => {
      window.location.href = "/profile";
    }, 1000);
  } else {
    Toast.show({
      icon: "fail",
      content: result.message,
    });
  }
  return {
    type: TYPES.LOGIN,
    payload: result,
  };
};
export const logoutAction = () => {
  sessionStorage.removeItem("access_token");
  Toast.show({
    icon: "success",
    content: "退出成功",
  });
  return {
    type: TYPES.LOGOUT,
  };
};
