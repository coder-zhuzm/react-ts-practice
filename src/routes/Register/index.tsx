import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { registerAction } from "../../store/actions/profile";
import { Button, Form, Input } from 'antd-mobile'
import NavHeader from '@/components/NavHeader';
import { Link, useNavigate } from 'react-router-dom';
import './index.less'
export default memo(function Register() {
  const history = useNavigate()
  const dispatch = useDispatch()

  const onFinish = (params: any) => {
    dispatch(registerAction(params))
  }
  return <div>
    <NavHeader history={history} >用户注册</NavHeader>
    <div className='adm'>
      <Form
        onFinish={onFinish}
        footer={
          <div className='footer-wrap'>
            <Button type='submit' color='primary' size='large' className='register-btn'>
              注册
            </Button>
            <Link to="/login">立即登录</Link>
          </div>
        }
      >
        <Form.Header>用户注册</Form.Header>
        <Form.Item name='username' label='用户名' rules={[{ required: true }]}>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item name='password' label='密码' rules={[{ required: true }]}>
          <Input placeholder='请输入密码' type='password' />
        </Form.Item>
        <Form.Item name='confirmPassword' label='确认密码' rules={[{ required: true }]}>
          <Input placeholder='请输入确认密码' type='password' />
        </Form.Item>
        <Form.Item name='email' label='邮箱' rules={[{ required: true }]}>
          <Input placeholder='请输入邮箱' />
        </Form.Item>
      </Form>

    </div>

  </div>;
});
