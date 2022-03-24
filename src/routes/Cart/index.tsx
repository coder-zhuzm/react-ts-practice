import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavHeader from "@/components/NavHeader";
import Lesson from "@/typings/lesson";
import actions from "@/store/actions/cart";
import {
  Table,
  Button,
  InputNumber,
  Popconfirm,
  Row,
  Col,
  Badge,
  Modal,
} from "antd";
import { CartItem } from "@/typings/cart";
export default memo(function Cart(props) {
  const history = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector((state: any) => ({
    cart: state.cart
  }))
  let [settleVisible, setSettleVisible] = useState(false);
  const confirmSettle = () => {
    setSettleVisible(true);
  };
  const handleOk = () => {
    setSettleVisible(false);
    dispatch(actions.settle())
  };
  const handleCancel = () => {
    setSettleVisible(false);
  };
  const columns = [
    {
      title: "商品",
      dataIndex: "lesson",
      render: (val: Lesson, row: CartItem) => (
        <>
          <p>{val.title}</p>
          <p>单价:{val.price}</p>
        </>
      ),
    },
    {
      title: "数量",
      dataIndex: "count",
      render: (val: number, row: CartItem) => (
        <InputNumber
          size="small"
          min={1}
          max={10}
          value={val}
          onChange={(value) => {
            console.log(row, value, '111111111');
            if (typeof value === 'number') {
              dispatch(actions.changeCartItemCount(row.lesson._id, value))
            }
          }}
        />
      ),
    },
    {
      title: "操作",
      render: (val: any, row: CartItem) => (
        <Popconfirm
          title="是否要删除商品?"
          onConfirm={() => {
            console.log(row);
            dispatch(actions.removeCartItem(row.lesson._id))
          }}
          okText="是"
          cancelText="否"
        >
          <Button size="small" color="danger">
            删除
          </Button>
        </Popconfirm>
      ),
    },
  ];
  const rowSelection: any = {
    selectedRowKeys: state.cart
      .filter((item: CartItem) => item.checked)
      .map((item: CartItem) => item.lesson._id),
    onChange: (selectedRowKeys: string[]) => {
      console.log("🚀 ~ file: index.tsx ~ line 86 ~ Cart ~ selectedRowKeys", selectedRowKeys)
      dispatch(actions.changeCheckedCartItems(selectedRowKeys))
    },
  };
  let totalCount: number = state.cart
    .filter((item: CartItem) => item.checked)
    .reduce((total: number, item: CartItem) => total + item.count, 0);
  let totalPrice = state.cart.filter((item: CartItem) => item.checked).reduce((total: number, item: CartItem) =>
    total + Number(item.lesson.price) * item.count, 0);
  return <div>
    <NavHeader history={history}>购物车</NavHeader>
    <Table
      rowKey={(row) => row.lesson._id}
      rowSelection={rowSelection}
      columns={columns}
      dataSource={state.cart}
      pagination={false}
      size="small"
    />
    <Row style={{ padding: "5px" }}>
      <Col span={4}>
        <Button color="danger" size="small" onClick={
          () => {
            dispatch(actions.clearCartItems())
          }
        }>
          清空
        </Button>
      </Col>
      <Col span={9}>
        已经选择{totalCount > 0 ? <Badge count={totalCount} /> : 0}件商品
      </Col>
      <Col span={7}>总价: ¥{totalPrice}元</Col>
      <Col span={4}>
        <Button color="danger" size="small" onClick={confirmSettle}>
          去结算
        </Button>
      </Col>
    </Row>
    <Modal
      title="去结算"
      visible={settleVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>请问你是否要结算?</p>
    </Modal>
  </div>;
});
