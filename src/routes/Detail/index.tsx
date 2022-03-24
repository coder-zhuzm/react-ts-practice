import React, { memo, useEffect, useState } from 'react';
import { getLessonByidAction } from '@/api/home';
import NavHeader from '@/components/NavHeader';
import Lesson from '@/typings/lesson';
import { Button, Card } from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import actions from '@/store/actions/cart';
import './index.less'
import { useDispatch } from 'react-redux';

const { Meta } = Card

export default memo(function Detail() {
  const history = useNavigate()
  const params = useParams();
  const location = useLocation()
  const dispatch = useDispatch()
  let [lesson, setLesson] = useState<Lesson>({} as Lesson);
  useEffect(() => {
    (async () => {
      let lesson: any = location?.state;
      if (!lesson) {
        let id: any = params?.id;
        let result: any = await getLessonByidAction(id);
        if (result.success) lesson = result.data;
      }
      setLesson(lesson);
    })();
  }, []);
  const addCartItem = (lesson: Lesson) => {
    let video: any = document.querySelector('#lesson-video');

    let cart: any = document.querySelector('.cart');

    let clonedVideo: HTMLVideoElement = video.cloneNode(true) as HTMLVideoElement;
    let videoWith = video.offsetWidth;
    let videoHeight = video.offsetHeight;
    let cartWith = cart.offsetWidth;
    let cartHeight = cart.offsetHeight;
    let videoLeft = video.getBoundingClientRect().left;
    let videoTop = video.getBoundingClientRect().top;
    let cartRight = cart.getBoundingClientRect().right;
    let cartBottom = cart.getBoundingClientRect().bottom;
    clonedVideo.style.cssText = `
          z-index: 1000;
          opacity:0.8;
          position:fixed;
          width:${videoWith}px;
          height:${videoHeight}px;
          top:${videoTop}px;
          left:${videoLeft}px;
          transition: all 2s ease-in-out;
        `;
    document.body.appendChild(clonedVideo);
    setTimeout(function () {
      clonedVideo.style.left = (cartRight - (cartWith / 2)) + 'px';
      clonedVideo.style.top = (cartBottom - (cartHeight / 2)) + 'px';
      clonedVideo.style.width = `0px`;
      clonedVideo.style.height = `0px`;
      clonedVideo.style.opacity = '50';
    }, 0);
    dispatch(actions.addCartItem(lesson))
  }
  return <div>
    <NavHeader history={history}>课程详情</NavHeader>
    <Card
      hoverable
      style={{ width: "100%" }}
      // cover={<video id="lesson-video"  src={lesson.video} controls autoPlay={false} />}
      cover={<img id="lesson-video" src={lesson.poster} />}
    >
      <Meta title={lesson.title} description={
        <>
          <p>价格: {lesson.price}</p>
          <p>
            <Button
              className="add-cart"
              onClick={() => addCartItem(lesson)}
            >加入购物车</Button></p>
        </>
      } />
    </Card>
  </div >;
});
