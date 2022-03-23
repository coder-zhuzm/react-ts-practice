import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from "../../store/actions/profile";
import { Button, Form, Input } from 'antd-mobile'
import NavHeader from '@/components/NavHeader';
import { Link, useNavigate } from 'react-router-dom';
import './index.less'

export default memo(function Login() {
  const history = useNavigate()
  const dispatch = useDispatch()
  const onFinish = (params: any) => {
    dispatch(loginAction(params))
  }
  return <div>
    <NavHeader history={history} >用户登录</NavHeader>
    <Form
      onFinish={onFinish}
      footer={
        <div className='footer-wrap'>
          <Button type='submit' color='primary' size='large' className='register-btn'>
            登录
          </Button>
          <Link to="/register">立即注册</Link>
        </div>
      }
    >
      <Form.Header>用户登录</Form.Header>
      <Form.Item name='username' label='用户名' rules={[{ required: true }]}>
        <Input placeholder='请输入用户名' />
      </Form.Item>
      <Form.Item name='password' label='密码' rules={[{ required: true }]}>
        <Input placeholder='请输入密码' type='password' />
      </Form.Item>
  
    </Form>
  </div>;
});
