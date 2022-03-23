import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@/assets/css/common.less'
import { Provider } from 'react-redux';
import store from './store';
import Tabs from '@/components/Tabs'
import Home from '@/routes/Home';
import Mine from '@/routes/Mine'
import Profile from '@/routes/Profile'
import Login from './routes/Login';
import Register from './routes/Register';
import 'antd/dist/antd.css'

export default function App() {
  return <Provider store={store}>
    <div className='main-container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Mine" element={<Mine />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Tabs />
      </BrowserRouter>
    </div>
  </Provider>
}
