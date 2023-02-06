import React from 'react';
import ReactDOM from 'react-dom/client';
// set up react router dom
import { BrowserRouter, Navigate, Route, Routes, HashRouter} from 'react-router-dom'

import Cart from './pages/Cart/Cart';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';
import HomeTemplate from './templates/HomeTemplate';
// style
import './assets/scss/main.scss'
// redux
import {Provider} from 'react-redux'
import { store } from './redux/configStore';




const root = ReactDOM.createRoot(
  
  document.getElementById('root') as HTMLElement
);
root.render(

  

 <Provider store={store}>
   <BrowserRouter basename='' >
    <Routes>
      <Route  path='' element={<HomeTemplate/>} >
        <Route index element={<Home/>} ></Route>
        <Route path='login' element={<Login/>} ></Route>
        <Route path='register' element={<Register/>} ></Route>
        <Route path='cart' element={<Cart/>} ></Route>
        <Route path='detail' >
          <Route path=':id' element={<Detail/>}></Route>
        </Route>
        <Route path='profile' element={<Profile/>} ></Route>
        <Route path='search' element={<Search/>} ></Route>
        <Route path='*' element={<Navigate to='/'  />} />
      </Route>
    </Routes>
  </BrowserRouter>
 </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

