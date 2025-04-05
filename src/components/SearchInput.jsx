import React, {useState, useEffect} from 'react'
import {db} from "../firebase"
import {collection, getDocs} from "firebase/firestore"

const SearchInput = ({search, setSearch, filteredGenre, setFilteredGenre}) => {
  const [games, setGames] = useState([])
  const [filteredGames, setFilteredGames] = useState([])
  const genreList = ["All", ...new Set(games.map((game) => game.genre))];

  useEffect(() => {
    const fetchGames = async () => {
      const gamesCollection = collection(db, "games");
      const gameSnapshot = await getDocs(gamesCollection);
      const gameList = gameSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setGames(gameList)
      setFilteredGames(gameList)
    }
    fetchGames();
  }, []);

  useEffect(() => {
    let filtered = games;

    if (search.trim() !== "") {
      filtered = filtered.filter((game) => 
      game.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filteredGenre !== "All") {
      filtered = filtered.filter((game) => game.genre === filteredGenre)
    }

      setFilteredGames(filtered)
  }, [search, games, filteredGenre])

  return (
    <div>
      <div className='flex flex-col'>
      <input className='flex flex-col p-4 bg-gray-200 text-sm rounded-lg outline-none focus:shadow-md' placeholder='Search:' type="text" value={search} onChange={(e) => setSearch(e.target.value)} />

      <select className='w-full p-4 mt-4 bg-gray-200 text-sm rounded-lg outline-none focus:shadow-md' value={filteredGenre} onChange={(e) => setFilteredGenre(e.target.value)}>
        {genreList.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      </div>
    </div>
  )
}

export default SearchInput