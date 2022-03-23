import React from "react";
import "./index.less";
import { LeftOutline } from "antd-mobile-icons";
interface Props {
  history: any;
  children: any;
}
export default function NavHeader(props: Props) {
  return (
    <div className="nav-header">
      {/* <LeftOutlined onClick={() => props.history.goBack()} /> */}
      <i>
        <LeftOutline onClick={() => props.history(-1)} />
      </i>
      {props.children}
    </div>
  );
}