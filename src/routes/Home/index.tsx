import React, { memo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCategory, getSlidersAction, getLessonsAction, refreshLessonsAction } from '@/store/actions/home';
import HomeHeader from '@/components/HomeHeader';
import HomeSliders from '@/components/HomeSliders';
import LessonList from '@/components/LessonList';
import './index.less';
export default memo(function Home() {
  const dispatch = useDispatch()
  const homeContainerRef = useRef(null);
  const state = useSelector((state: any) => ({
    currentCategory: state.home.currentCategory,
    sliders: state.home.sliders,
    lessons: state.home.lessons
  }))
  const setCurrentData = (currentCategory: string) => {
    dispatch(setCurrentCategory(currentCategory))
  }
  return <div>
    <HomeHeader
      currentCategory={state.currentCategory}
      setCurrentCategory={setCurrentData}
      refreshLessons={() => {
        dispatch(refreshLessonsAction())
      }}
    />
    <div className="home-container" ref={homeContainerRef}>
      <HomeSliders sliders={state.sliders} getSliders={() => {
        dispatch(getSlidersAction())
      }
      } />
      <LessonList
        container={homeContainerRef}
        lessons={state.lessons}
        getLessons={() => { dispatch(getLessonsAction()) }}
      />

    </div>
  </div>;
});
