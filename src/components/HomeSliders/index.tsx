import React, { memo, useEffect } from 'react';
import { Swiper } from 'antd-mobile';

import './index.less'
export default memo(function HomeSliders(props: any) {
  useEffect(() => {
    if (props.sliders.length == 0) {
      props.getSliders();
    }
  }, []);
  return <div>
    <Swiper loop autoplay allowTouchMove>
      {props.sliders.map((item: any, index: number) => (
        <Swiper.Item key={index}>
          <div>
            <img src={item.url} />
          </div>
        </Swiper.Item>
      ))}
    </Swiper>

  </div>;
});
