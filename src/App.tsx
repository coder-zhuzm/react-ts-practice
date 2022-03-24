import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@/assets/css/common.less'
import { Provider } from 'react-redux';
import { store, persistor } from "./store"; //引入仓库
import Tabs from '@/components/Tabs'
import Home from '@/routes/Home';
import Mine from '@/routes/Mine'
import Profile from '@/routes/Profile'
import Login from './routes/Login';
import Register from './routes/Register';
import Detail from './routes/Detail';
import 'antd/dist/antd.css'
import Cart from './routes/Cart';
import { PersistGate } from "redux-persist/integration/react";
export default function App() {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div className='main-container'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="*" element={<Home />} />
          </Routes>
          <Tabs />
        </BrowserRouter>
      </div>
    </PersistGate>

  </Provider>
}
