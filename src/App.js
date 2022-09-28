import './App.css';
import React from 'react'
import Header from './components/Header';
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
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <>
      <Header />
      <Routes>
      <Route exact path="/" element={<LandingPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/login"
          element={
            <AuthProvider>
              <LoginPage />
            </AuthProvider>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
      <FooterAuth />
    </>
  );
}

export default App;


