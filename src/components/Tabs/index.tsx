import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
// import { Space } from 'antd-mobile'
import { AntOutline, UserOutline, GiftOutline } from 'antd-mobile-icons'
// import './index.css'
// import styles from './index.module.less'
import './index.less';

export default memo(function Tabs() {
  return (
    <footer>
      <NavLink to="/">
        <i>
          <AntOutline />
        </i>
        <span>首页</span>
      </NavLink>
      <NavLink to="/Cart">
        <i className='cart'>
          <GiftOutline />
        </i>
        <span>购物车</span>
      </NavLink>
      <NavLink to="/Profile">
        <i>
          <UserOutline />
        </i>
        <span>个人中心 </span>
      </NavLink>
    </footer>
  );
});
