import React from 'react'
import { Routes, Route } from "react-router";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {useSelector,useDispatch} from "react-redux";
import { checkAuth } from './../authSlice';
import { useEffect } from 'react';

const App = () => {
  
  // isAuthenticated
  const { isAuthenticated } = useSelector(state => state.auth);
   const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(checkAuth());
    },[dispatch])


  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>

    </>
  )
}

export default App
