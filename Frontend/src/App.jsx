import React from 'react'
import { Routes, Route } from "react-router";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {useSelector,useDispatch} from "react-redux";
import { checkAuth } from './../authSlice';
import { useEffect } from 'react';


function App(){
  
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state)=>state.auth);

  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);



  return(
  <>
    <Routes>
      <Route path="/" element={isAuthenticated ?<HomePage></HomePage>:<Navigate to="/signup" />}></Route>
      <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<LoginPage></LoginPage>} ></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<SignUpPage></SignUpPage>}></Route>
    </Routes>
  </>
  )
}

export default App;
