import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCategory } from '@/store/actions/home';
import HomeHeader from '@/components/HomeHeader';
import './index.less';
export default memo(function Home() {
  const dispatch = useDispatch()
  const state = useSelector((state: any) => ({
    HomeState: state.home
  }))
  const setCurrentData = (currentCategory: string) => {
    dispatch(setCurrentCategory(currentCategory))
  }
  return <div>
    <HomeHeader currentCategory={state.HomeState.currentCategory} setCurrentCategory={setCurrentData} />
  </div>;
});
