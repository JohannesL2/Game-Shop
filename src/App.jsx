import { useState } from 'react'
import './App.css'
import fetchAndStore from './components/getGames';
import GameList from './components/GameList';
import Cart from './components/ShoppingCart';
import Cartbtn from './components/CartBtn';

import GameListPage from './pages/GameListPage.jsx'

import ShoppingCartPage from './pages/ShoppingCartPage.jsx';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header.jsx';

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
    </Routes>
    </>
  )
}

export default App
