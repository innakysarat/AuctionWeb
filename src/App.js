import './App.css';
import React from 'react'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Product from './components/Product';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import ForgetPasswordPage from './components/ForgetPassword'
import HomePage from './components/HomePage'
import FooterAuth from './components/FooterAuth';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<Product />} />
        <Route exact path="/landing" element={<LandingPage />} />
        <Route path="/login"
          element={
            <AuthProvider>
              <LoginPage />
            </AuthProvider>} />
        {/* <LoginPage /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
      <Footer />
      <FooterAuth />
    </>
  );
}

export default App;


