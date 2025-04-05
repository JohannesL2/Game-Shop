import { useState } from 'react'
import './App.css'
import fetchAndStore from './components/getGames';
import GameList from './components/GameList';
import Cart from './components/ShoppingCart';
import Cartbtn from './components/CartBtn';

import GameListPage from './pages/GameListPage.jsx'
import ShoppingCartPage from './pages/ShoppingCartPage.jsx';
import ProductPage from './pages/ProductPage.jsx';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminPanel from './pages/AdminPanel.jsx'

function App() {
  const [count, setCount] = useState(0)
  const [error, setError] = useState(null);

  const handleFetchAndStore = async () => {
    setError(null);


    try {
      await fetchAndStore();
      console.log("fetched games and stored in firebase")
    } catch (error) {
      setError("failed to fetch and store games")
      console.error(error)
    }
  }

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
    </>
  )
}

export default App
