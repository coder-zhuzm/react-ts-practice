import axios from "axios";

export default function request(option: any) {
  return new Promise((resolve, reject) => {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL:
        process.env.NODE_ENV === "production"
          ? "http://42.192.154.122:8001/"
          : "http://42.192.154.122:8001/",
      timeout: 10000,
    });
    instance.defaults.headers.post["Content-Type"] =
      "application/json;charset=UTF-8";

    // 配置请求和响应拦截
    instance.interceptors.request.use(
      (config) => {
        // console.log('来到了request拦截success中');
        // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

        // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面
        let access_token = sessionStorage.getItem("access_token") || "";
        config.headers = {
          Authorization: `Bearer ${access_token}`,
        };
        // 3.对请求的参数进行序列化(看服务器是否需要序列化)
        // config.data = qs.stringify(config.data)
        // console.log(config);

        // 4.等等
        return config;
      },
      (err) => {
        // console.log('来到了request拦截failure中');
        return err;
      }
    );

    instance.interceptors.response.use(
      (response) => {
        // console.log('来到了response拦截success中');
        return response.data;
      },
      (err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = "请求错误";
              break;
            case 401:
              err.message = "未授权的访问";
              break;
            default:
              err.message = "其他错误信息";
          }
        }
        return err?.response.data || err;
      }
    );

    // 2.传入对象进行网络请求
    instance(option)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
