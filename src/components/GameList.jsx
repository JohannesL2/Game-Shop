import React, { useContext, useEffect, useState } from 'react';
import {db} from '../firebase';
import {collection, getDocs} from 'firebase/firestore';
import fetchAndStore from './getGames';
import StarRating from './StarRating';
import { CartContext } from '../context/cart';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';

const GameList = () => {
const [games, setGames] = useState([]);
const {cartItems, addToCart} = useContext(CartContext)
  const [search, setSearch] = useState("")
    const [filteredGenre, setFilteredGenre] = useState("All")

useEffect(() => {
  const fetchGames = async () => {
  try {
    const gamesSnapshot = await getDocs(collection(db, "games"));
    const gamesList = [];
    gamesSnapshot.forEach((doc) => {
      gamesList.push({id: doc.id, ...doc.data()})
    })
    setGames(gamesList)
  } catch (error) {
    console.error("error fetching", error);
  }
}

    fetchAndStore();
    fetchGames();
  }, []);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase()) && (filteredGenre === "All" || game.genre === filteredGenre)
  )
  
  return (
    <div className='container mx-auto p-6'>

      <SearchInput
      search={search}
      setSearch={setSearch}
      filteredGenre={filteredGenre}
      setFilteredGenre={setFilteredGenre}
      games={games}
       />

      <div className='grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 mt-6'>
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => {
          const ratingValue = Math.round(game.rating / 0.5) * 0.5;
          console.log(ratingValue)

          return (
          <div key={game.id}>
            <Link to={`/game/${game.id}`}>
              <img src={game.image} alt="" className='w-full h-48 object-cover rounded-md shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105' />
            </Link>
            <div className='p-2'>
            <h2>{game.title}</h2>
            <h2>{game.rating}</h2>
            <StarRating value={ratingValue}/>
            <h3>{game.price} SEK</h3>
            <button onClick={() => addToCart(game)}>Add to cart</button>
            </div>
          </div>
          )
})     
) : null
}
      </div>    
    </div>
  )
};


export default GameList