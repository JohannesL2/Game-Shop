import { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import fetchAndStore from './getGames';
import StarRating from './StarRating';
import { CartContext } from '../context/cart';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';
import toast, { Toaster } from 'react-hot-toast';

const GameList = () => {
  const [games, setGames] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [search, setSearch] = useState('');
  const [filteredGenre, setFilteredGenre] = useState('All');

  useEffect(() => {
    let isMounted = true;

    const loadGames = async () => {
      const gamesSnapshot = await getDocs(collection(db, 'games'));
      const gamesList = gamesSnapshot.docs.map((gameDocument) => ({
        id: gameDocument.id,
        ...gameDocument.data(),
      }));
      if (isMounted) setGames(gamesList);
    };

    const syncGames = async () => {
      try {
        await loadGames();
        await fetchAndStore();
        await loadGames();
      } catch (error) {
        console.error('Error loading games from Firebase or RAWG', error);
      }
    };

    syncGames();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddToCart = (game) => {
    addToCart(game);
    toast.success(`${game.title} has been added to cart!`, {
      style: {
        background: '#17191d',
        color: '#fff',
        border: '1px solid #282c34',
        padding: '16px',
        fontSize: '14px',
        borderRadius: '8px'
      },
      iconTheme: {
        primary: '#ff7045',
        secondary: '#fff',
      },
    });
  };

  const filteredGames = games.filter((game) =>
    game.title?.toLowerCase().includes(search.toLowerCase()) &&
    (filteredGenre === 'All' || game.genre === filteredGenre)
  );
  
  const featuredGame = games.reduce(
    (best, game) => Number(game.rating || 0) > Number(best.rating || 0) ? game : best,
    games[0]
  );

  return (
    <main className="storefront">
      <Toaster position="top-right" />

      {featuredGame && (
        <section
          className="featured-game bg-fixed"
          style={{ backgroundImage: `url("${featuredGame.image}")` }}
          aria-label={`Featured game: ${featuredGame.title}`}
        >
          <div className="featured-game__content">
            <span className="eyebrow">Featured game</span>
            <h1>{featuredGame.title}</h1>
            <div className="featured-game__details">
              <span className="featured-game__rating">
                ★ {Number(featuredGame.rating || 0).toFixed(1)}
              </span>
              <span className="featured-game__price">{featuredGame.price} SEK</span>
            </div>
            <div className="featured-game__actions">
              <Link className="button button--primary" to={`/game/${featuredGame.id}`}>
                View game
              </Link>
              <button
                className="button button--secondary"
                onClick={() => handleAddToCart(featuredGame)}
              >
                Add to cart
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="game-catalog" id="games">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Find your next favorite</span>
            <h2 className="text-2xl font-bold text-gray-900">Popular games</h2>
          </div>
          <span className="game-count">{filteredGames.length} games</span>
        </div>

        <SearchInput
          search={search}
          setSearch={setSearch}
          filteredGenre={filteredGenre}
          setFilteredGenre={setFilteredGenre}
          games={games}
        />

        {filteredGames.length > 0 ? (
          <div className="game-grid">
            {filteredGames.map((game) => {
              return (
                <article className="game-card" key={game.id}>
                  <Link className="game-card__image-link" to={`/game/${game.id}`}>
                    <img src={game.image} alt={game.title} className="game-card__image" />
                    <span className="game-card__rating">
                      ★ {Number(game.rating || 0).toFixed(1)}
                    </span>
                  </Link>
                  <div className="game-card__content">
                    <div className="game-card__title-row">
                      <Link to={`/game/${game.id}`} className="game-card__title">
                        {game.title}
                      </Link>
                      <span className="game-card__price">{game.price} SEK</span>
                    </div>
                    <div className="game-card__footer">
                      <button
                        className="game-card__watch-trailer"
                        onClick={() => handleAddToCart(game)}
                        aria-label={`Add ${game.title} to cart`}
                      >
                        Watch trailer
                      </button>
                      <button
                        className="game-card__add"
                        onClick={() => handleAddToCart(game)}
                        aria-label={`Add ${game.title} to cart`}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="empty-games">No games found. Try another search.</p>
        )}
      </section>
    </main>
  );
};

export default GameList;