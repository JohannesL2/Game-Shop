import React, { useEffect, useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../firebase'
import {doc, getDoc} from 'firebase/firestore'
import StarRating from '../components/StarRating'
import { CartContext } from '../context/cart'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const ProductPage = () => {
  const {id} = useParams();
  const [game, setGame] = useState(null)
  const {cartItems, addToCart} = useContext(CartContext)

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
  <div>
    <div>
      
      <Link to='/'>
      <button className='fixed top-20 right-5 shadow-md z-1'>❮ Go back</button>
      </Link>
    </div>
    <div>
      <h1>{game.title}</h1>
      <img src={game.image} alt="" className='w-full h-68 object-cover' />
<div>
<section className="embla mt-6">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {screenshots.map((screenshot, index) => (
            <div className="embla__slide" key={index}>
      <img
      src={screenshot.image}
      className='w-full h-72 object-cover shadow-md'
      />
            </div>
          ))}
        </div>
      </div>
    </section>
      </div>
</div>
<div>
<div className='flow-root'>
            <div className='float-left mt-4'>
            <h2 className='font-semibold'>{game.rating}</h2>
            <StarRating value={ratingValue}/>
            </div>
            <div className='mt-6'>
            <h3 className='float-right mt-2 pl-4 font-semibold'>{game.price} SEK</h3>
            <button className='float-right add-to-cartBtn' onClick={() => addToCart(game)}>Add to cart</button>
            </div>
            </div>
            <p className='mt-4 p-4 leading-relaxed text-gray-800'>{game.description}</p>
    </div>
    </div>
  )
}

export default ProductPage