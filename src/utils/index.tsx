import { debounce, throttle } from 'lodash'
//ele 要实现此功能DOM对象 callback加载更多的方法
export function loadMore(element: any, callback: any) {
  function _loadMore() {
    let clientHeight = element.clientHeight;
    let scrollTop = element.scrollTop;
    let scrollHeight = element.scrollHeight;
    if (clientHeight + scrollTop + 10 >= scrollHeight) {
      callback();
    }
  }
  element.addEventListener("scroll", debounce(_loadMore, 300));
}
export function downRefresh(element: HTMLDivElement, callback: Function) {
  let startY: number; //变量，存储接下时候的纵坐标
  let distance: number; //本次下拉的距离
  let originalTop = element.offsetTop; //最初此元素距离顶部的距离 top=50
  let startTop: number;
  let $timer: any = null;
  element.addEventListener("touchstart", function (event: TouchEvent) {
    if ($timer) clearInterval($timer);
    let touchMove = throttle(_touchMove, 30);
    //只有当此元素处于原始位置才能下拉，如果处于回弹的过程则不能拉了.并且此元素向上卷去的高度==0
    if (element.scrollTop === 0) {
      startTop = element.offsetTop;
      startY = event.touches[0].pageY; //记录当前点击的纵坐标
      element.addEventListener("touchmove", touchMove);
      element.addEventListener("touchend", touchEnd);
    }

    function _touchMove(event: TouchEvent) {
      let pageY = event.touches[0].pageY; //拿到最新的纵坐标
      if (pageY > startY) {
        distance = pageY - startY;
        element.style.top = startTop + distance + "px";
      } else {
        element.removeEventListener("touchmove", touchMove);
        element.removeEventListener("touchend", touchEnd);
      }
    }

    function touchEnd(_event: TouchEvent) {
      element.removeEventListener("touchmove", touchMove);
      element.removeEventListener("touchend", touchEnd);
      if (distance > 30) {
        callback();
      }
      $timer = setInterval(() => {
        let currentTop = element.offsetTop;
        if (currentTop - originalTop > 1) {
          element.style.top = currentTop - 1 + "px";
        } else {
          element.style.top = originalTop + "px";
        }
      }, 13);
    }
  });
}



export const store = {
  set(key: string, val: string) {
    sessionStorage.setItem(key, val);
  },
  get(key: string) {
    return sessionStorage.getItem(key);
  },
};
