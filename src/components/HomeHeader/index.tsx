import React, { useState, CSSProperties } from 'react';
import './index.less';
import classnames from 'classnames';
import { UnorderedListOutline } from 'antd-mobile-icons'

import { Transition } from 'react-transition-group';
import logo from '@/assets/images/logo.png';
//ts 不认识图片，只认识js jsx tsx
//let logo = require('../../../../assets/images/logo.png');
//如果是用require加载的话，返回值的default属性才是那个图片地址
//如果你非要用import如何解决?
const duration = 1000;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}
interface TransitionStyles {
  entering: CSSProperties;
  entered: CSSProperties;
  exiting: CSSProperties;
  exited: CSSProperties;
}
const transitionStyles: TransitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};


interface Props {
  currentCategory: string;//当前选中的分类 此数据会放在redux仓库中
  setCurrentCategory: (currentCategory: string) => any;// 改变仓库中的分类
  // refreshLessons: any;
}
function HomeHeader(props: Props) {
  let [isMenuVisible, setIsMenuVisible] = useState(false);
  const setCurrentCategory = (event: React.MouseEvent<HTMLUListElement>) => {
    let target: HTMLUListElement = event.target as HTMLUListElement;
    let category: any = target.dataset.category;
    props.setCurrentCategory(category);
    // props.refreshLessons();
    setIsMenuVisible(false);
  }
  return (
    <header className="home-header">
      <div className="logo-header">
        <img src={logo}  alt='logo'/>
        <i>
          <UnorderedListOutline onClick={() => setIsMenuVisible(!isMenuVisible)} />
        </i>
      </div>
      <Transition in={isMenuVisible} timeout={duration}>
        {
          (state: keyof TransitionStyles) => (
            <ul
              className="category"
              onClick={setCurrentCategory}
              style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              <li data-category="all" className={classnames({ active: props.currentCategory === 'all' })}>全部课程</li>
              <li data-category="react" className={classnames({ active: props.currentCategory === 'react' })}>React课程</li>
              <li data-category="vue" className={classnames({ active: props.currentCategory === 'vue' })}>Vue课程</li>
            </ul>
          )
        }
      </Transition>
    </header>
  )
}
export default HomeHeader;