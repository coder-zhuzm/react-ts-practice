import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Space } from 'antd-mobile'
import { AntOutline, UserOutline, GiftOutline } from 'antd-mobile-icons'
// import './index.css'
// import styles from './index.module.less'
import './index.less';

export default memo(function Tabs() {
  return (
    <footer>
      <NavLink to="/">
        <AntOutline fontSize={24} />
        <span>首页</span>
      </NavLink>
      <NavLink to="/Mine">
        <GiftOutline fontSize={24} />
        <span>购物车</span>
      </NavLink>
      <NavLink to="/Profile">
        <UserOutline fontSize={24} />
        <span>个人中心 </span>
      </NavLink>
    </footer>
  );
});
