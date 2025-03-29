import React, {useState, useEffect} from 'react'
import fetchAndStore from '../components/getGames'
import GameList from '../components/GameList'
import Cartbtn from '../components/CartBtn'

const GameListPage = () => {

  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAndStore();
      } catch (error) {
        setError("")
      }
    };
      fetchData();
    }, []);
    return (
      <div>
      <GameList/>
      </div>
    )
}

export default GameListPage;