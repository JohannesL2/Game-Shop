import { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase'
import {doc, getDoc} from 'firebase/firestore'
import StarRating from '../components/StarRating'
import { CartContext } from '../context/cart'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import toast, { Toaster } from 'react-hot-toast';

const ProductPage = () => {
  const {id} = useParams();
  const [game, setGame] = useState(null)
  const {addToCart} = useContext(CartContext)

  const options = {loop: true}
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()])


  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gameRef = doc(db, 'games', id);
        const gameSnap = await getDoc(gameRef);
        if (gameSnap.exists()) {
          setGame({id: gameSnap.id, ...gameSnap.data()})
        } else {
          console.log('Game not found')
        }
      } catch (error) {
        console.error("error fetching", error);
      }
    }
    
        fetchGames();
      }, [id]);
      
  const handleAddToCart = () => {
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

  if (!game) {
  return (
  <div>
    <div>
      <Link to='/'>
      <button className='fixed top-20 right-5 shadow-md z-1'>Go back</button>
      </Link>
    </div>
    <div>
      <h1>game not found</h1>
    </div>
  </div>
  )
}

const ratingValue = Math.round(game.rating / 0.5) * 0.5;
const screenshots = game.screenshots || [];

return (
  <div className="min-h-screen bg-gray-100 text-gray-900 p-4 sm:p-8 md:p-12">
    <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-indigo-600 transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">{game.title}</span>
        </nav>
<div className="space-y-6">
          <div 
  className="w-full h-80 sm:h-96 md:h-[450px] bg-cover bg-center bg-fixed border border-gray-200 shadow-md relative overflow-hidden"
  style={{ backgroundImage: `url(${game.image || game.picture})` }}
  aria-label={game.title}
>
  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
</div>

          {screenshots.length > 0 && (
            <section className="embla overflow-hidden bg-white p-2 border border-gray-200 shadow-sm">
              <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container flex">
                  {screenshots.map((screenshot, index) => (
                    <div
                      className="embla__slide flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] min-w-0 pr-4"
                      key={index}
                    >
                      <img
                        src={
                          typeof screenshot === 'string'
                            ? screenshot
                            : screenshot.image
                        }
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-48 object-cover shadow-sm hover:opacity-90 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      <div className="mt-8 bg-white p-6 sm:p-8 shadow-md border border-gray-200">
          <div className="flex flex-col md:flex-row justify-between gap-6 pb-6 border-b border-gray-200">
            <div className="space-y-2 md:items-start">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                {game.title}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {game.released && (
                  <span>
                    <strong className="text-gray-800">Released:</strong>{' '}
                    {game.released}
                  </span>
                )}
                {game.genre && (
                  <span>
                    <strong className="text-gray-800">Genre:</strong>{' '}
                    {game.genre}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col md:items-end justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-amber-500">
                  {game.rating}
                </span>
                <StarRating value={ratingValue} />
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-extrabold text-black">
                  {game.price} SEK
                </span>
                <button
                  onClick={handleAddToCart}
                  className="game-card__add inline-flex items-center justify-center px-5 py-2.5 border border-[#ff7045] rounded-md bg-[#ff7045] text-[#17191d] text-xs font-bold cursor-pointer transition-all duration-200 hover:bg-[#ff8560] hover:border-[#ff8560] hover:shadow-[0_4px_12px_rgba(255,112,69,0.4)] active:scale-95 whitespace-nowrap"
                  aria-label={`Add ${game.title} to cart`}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Om spelet</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {game.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage