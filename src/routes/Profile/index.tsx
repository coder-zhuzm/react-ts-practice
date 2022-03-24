import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { validateAction, logoutAction, changeAvatarAction } from "../../store/actions/profile";
import LOGIN_TYPES from "../../typings/login-types";
import { Descriptions, Alert, Upload, message } from "antd";
import { Button } from 'antd-mobile'
import NavHeader from "../../components/NavHeader";
import "./index.less";
import { useNavigate } from "react-router";
//当前的组件有三个属性来源
//1.dispatch 的 state 2.actions对象类型 3. 来自路由 4.用户传入进来的其它属性
function Profile(props: any) {
  const dispatch = useDispatch()
  const history = useNavigate();
  const state = useSelector((state: any) => ({
    loginState: state.profile.loginState,
    user: state.profile.user,
    error: state.profile.error,
  }))
  const [loading, setLoading] = useState(false);
  const [element, setElement] = useState<any>()
  const { loginState, user, error } = state
  useEffect(() => {
    dispatch(validateAction())
  }, [dispatch])
  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("你只能上传JPG/PNG 文件!");
    }
    const isLessThan2M = file.size / 1024 / 1024 < 2;
    if (!isLessThan2M) {
      message.error("图片必须小于2MB!");
    }
    return isJpgOrPng && isLessThan2M;
  }
  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    } else if (info.file.status === "done") {
      let { success, data, message } = info.file.response;
      if (success) {
        setLoading(false);
        dispatch(changeAvatarAction(data))
      } else {
        message.error(message);
      }
    }
  }
  useEffect(() => {
    if (loginState === LOGIN_TYPES.UN_VALIDATE) {
      //如果未验证则内容为null
      setElement(null)
    } else if (loginState === LOGIN_TYPES.LOGINED) {
      //如果已经登录显示用户信息
      const content = (
        <div className="user-info">
          <Descriptions title="当前登录用户">
            <Descriptions.Item label="用户名">{user?.username}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{user?.email}</Descriptions.Item>
            <Descriptions.Item label="头像">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://42.192.154.122:8001/user/uploadAvatar"
                beforeUpload={beforeUpload}
                data={{ userId: state.user._id }}
                onChange={handleChange}
              >
                {state.user.avatar ? (
                  <img
                    src={state.user.avatar}
                    alt="avatar"
                    crossOrigin='anonymous' //解决跨域问题
                    style={{ width: "100%" }}
                  />
                ) : (
                  '上传按钮'
                )}
              </Upload>
            </Descriptions.Item>
          </Descriptions>
          <Button color={"primary"} onClick={async () => {
            //注销
            await dispatch(logoutAction())
            history('/login');
          }}>退出登录</Button>
        </div>
      );
      setElement(content)
    } else {
      // 如果没有登录,则显示注册和登录按钮
      const content = (
        <>
          <Alert
            type="warning"
            message="当前未登录"
            description="亲爱的用户你好，你当前尚未登录，请你选择注册或者登录"
          />
          <div style={{ textAlign: "center", padding: "50px" }}>
            <Button color="default" onClick={() => history("/login")}>
              登录
            </Button>
            <Button
              color="primary"
              style={{ marginLeft: "50px" }}
              onClick={() => history("/register")}
            >
              注册
            </Button>
          </div>
        </>
      );
      setElement(content)
    }

  }, [loginState, dispatch, user, error, history])



  return (
    <section>
      <NavHeader history={history}>个人中心</NavHeader>
      {element && element}

    </section>
  )

}
export default Profile;