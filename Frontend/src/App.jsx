import React from 'react'
import { Routes, Route ,Navigate} from "react-router";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import {useSelector,useDispatch} from "react-redux";
import { checkAuth } from './authSlice';
import { useEffect } from 'react';


function App(){
  
  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state)=>state.auth);

  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

 if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return(
  <>
    <Routes>
      <Route path="/" element={isAuthenticated ?<HomePage></HomePage>:<Navigate to="/signup" />}></Route>
      <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<LoginPage></LoginPage>} ></Route>
      <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<SignUpPage></SignUpPage>}></Route>
      {/* ADMIN ROUTE */}
     {/* <Route 
        path="/admin" 
        element={
          isAuthenticated && user?.role === 'admin' ? 
            <AdminPanel /> : 
            <Navigate to="/" />
        } 
      /> */}
   
   
    </Routes>
  </>
  )
}

export default App;
