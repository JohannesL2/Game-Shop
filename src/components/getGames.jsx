import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc, doc, getDocs, updateDoc } from "firebase/firestore";

const API_KEY = import.meta.env.VITE_REACT_APP_KEY

let fetchAndStorePromise;

const fetchAndStore = () => {
  if (!fetchAndStorePromise) {
    fetchAndStorePromise = fetchAndStoreGames().catch((error) => {
      fetchAndStorePromise = undefined;
      throw error;
    });
  }

  return fetchAndStorePromise;
};

const fetchAndStoreGames = async () => {
  const res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
  const games = res.data.results;
  const gamesSnapshot = await getDocs(collection(db, "games"));
  const existingGames = new Map(
    gamesSnapshot.docs.map((gameDocument) => [
      gameDocument.data().title,
      { id: gameDocument.id, ...gameDocument.data() },
    ])
  );

  for (let game of games) {
    const existingGame = existingGames.get(game.name);
    if (existingGame) {
      if (!Array.isArray(existingGame.screenshots)) {
        const screenshots = await fetchScreenshots(game.id);
        await updateDoc(doc(db, "games", existingGame.id), { screenshots });
      }
      continue;
    }

    const price = Math.floor(Math.random() * 600) + 100;

    const gameDetails = await axios.get(`https://api.rawg.io/api/games/${game.id}?key=${API_KEY}`)
    const description = gameDetails.data.description_raw ||'Description not available';
    const screenshots = await fetchScreenshots(game.id);

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
    existingGames.set(game.name, { screenshots });
    console.log(`Saved: ${game.name}`)
  }
}

const fetchScreenshots = async (gameId) => {
  const response = await axios.get(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${API_KEY}`);
  return Array.isArray(response.data.results) ? response.data.results : [];
};

export default fetchAndStore;