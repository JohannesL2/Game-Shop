import './App.css'
import Footer from './components/Footer.jsx';

import GameListPage from './pages/GameListPage.jsx'
import ShoppingCartPage from './pages/ShoppingCartPage.jsx';
import ProductPage from './pages/ProductPage.jsx';

import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminPanel from './pages/AdminPanel.jsx'

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<GameListPage/>}/>
      <Route path='/cart' element={<ShoppingCartPage/>}/>
      <Route path='/game/:id' element={<ProductPage/>}/>
      <Route path='/LoginPage' element={<LoginPage/>}/>
      <Route path='*' element={<NotFound/>}/>
      <Route path='/admin/*' element={<AdminPanel/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
