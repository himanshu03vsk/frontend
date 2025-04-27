import './App.css'



// This will have routing


// Importing the rounting libs and modules
import React from 'react';
import {AuthProvider} from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AccountSetting from './pages/AccountSetting';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import ProductListing from './pages/ProductListing';
import ShoppingCart from './pages/ShoppingCart';
import ProtectedRoute from './components/ProtectedRoute';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import AdminChat from './components/AdminChat';
import BuyerChat from './components/BuyerChat';
// import { Router, Route, Link, useNavigate, Outlet } from 'react-router';


function App() {

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route element={<Layout />}>   {/* */}
  {/* The rest of your page content */}



          <Route path='/' element={<Home />}></Route>    {/* */}
          <Route path='/contact' element={<ContactUs />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/chat-with-seller' element={<BuyerChat />}></Route>

          <Route path='/logout' element={<Logout />}></Route>
          <Route path='/prodlist' element={<ProductListing />}></Route>
          <Route path='/proddetail/:id' element={<ProductDetail />}></Route>
          <Route path='/cart' element={<ProtectedRoute><ShoppingCart /></ProtectedRoute>}></Route>
          <Route path='/accsetting' element={<ProtectedRoute><AccountSetting /></ProtectedRoute>}></Route>

          <Route path='/checkout' element={<ProtectedRoute><Checkout /></ProtectedRoute>}></Route>

        </Route>
        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>}></Route>

      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;




