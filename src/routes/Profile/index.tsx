import React, { PropsWithChildren } from "react";
import { connect } from "react-redux";

interface Params {}

function Profile(props:any) {
  return <div>Profile</div>;
}
export default connect()(Profile);