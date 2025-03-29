import axios from "axios";
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const API_KEY = "9804126707654f2b887ff8715952bae6"

const fetchAndStore = async () => {
  const res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2019-09-30&platforms=18,1,7`)
  const games = res.data.results;
  console.log(games)

  for (let game of games) {
    const q = query(collection(db, "games"), where("title", "==", game.name));
    const querySnapshot = await getDocs(q);

if (querySnapshot.empty) {
    const price = Math.floor(Math.random() * 600) + 100

    await addDoc(collection(db, "games"), {
      title: game.name,
      image: game.background_image,
      genre: game.genres.map((g) => g.name).join(", "),
      released: game.released,
      rating: game.rating,
      price: price,
    });
    console.log(`Saved: ${game.name}`)
  } else {
    console.log(`${game.name} already exists.`)
    }
  }
}

export default fetchAndStore