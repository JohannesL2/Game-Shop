import { useContext, useEffect, useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { CartContext } from '../context/cart';

const Cartbtn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {cartItems} = useContext(CartContext);


  {/*Animation för cartBtn*/}
  const [Animation, setAnimation] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      setAnimation(true);
      const timer = setTimeout(() => setAnimation(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartItems])



  const handleClick = () => {
    if (location.pathname === '/cart') {
      navigate('/');
    } else {
      navigate('/cart');
    }
  }


  return (
    <nav>
      <button onClick={handleClick}
      className={`fixed top-5 right-5 p-6 shadow-md z-1 transition-transform duration-300 ease-in-out hover:scale-110 ${Animation ? 'scale-110 transition-transform duration-300 ease-in-out' : 'scale-100'}
      `}
      >
        {location.pathname === '/cart' ? '⬅️' : '🛒'}
        {cartItems.length > 0 && location.pathname !== '/cart' && (
          <span className='absolute -top-3 -right-3 bg-red-700 text-white size-6 rounded-md'>
            {cartItems.length}
          </span>
        )}
      </button>
    </nav>
  )
}

export default Cartbtn;