import React, { memo } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import actions from '@/store/actions/home';
import HomeHeader from '@/components/HomeHeader';
import { HomeState } from '@/store/reducers/home';
import './index.less';
export default memo(function Home() {
  const dispatch = useDispatch()
  const state = useSelector((state: any) => ({
    HomeState: state.home
  }))
  console.log(state);
  return <div>
    <HomeHeader currentCategory={state.HomeState} />
  </div>;
});
