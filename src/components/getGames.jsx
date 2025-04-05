import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const API_KEY = import.meta.env.VITE_REACT_APP_KEY

const fetchAndStore = async () => {
  const res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
  const games = res.data.results;
  console.log(games)

  for (let game of games) {
    const q = query(collection(db, "games"), where("title", "==", game.name));
    const querySnapshot = await getDocs(q);

if (querySnapshot.empty) {
    const price = Math.floor(Math.random() * 600) + 100;
    
    const gameDetails = await axios.get(`https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`)
    const description = gameDetails.data.description_raw ||'Description not available';

    const gameScreenshots = await axios.get(`https://api.rawg.io/api/games/${game.id}/screenshots?key=${API_KEY}`)
    const screenshots = gameScreenshots.data.results || 'Screenshots not available'

    await addDoc(collection(db, "games"), {
      title: game.name,
      image: game.background_image,
      genre: game.genres.map((g) => g.name).join(", "),
      released: game.released,
      rating: game.rating,
      price: price,
      description: description,
      screenshots: screenshots,
    });
    console.log(`Saved: ${game.name}`)
  } else {
    console.log(`${game.name} already exists.`)
    }
  }
}

export default fetchAndStore