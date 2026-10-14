import { useContext, useEffect, useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { CartContext } from '../context/cart';

const Cartbtn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {cartItems} = useContext(CartContext);


  const [animation, setAnimation] = useState(false);

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
      className={`header-action ${animation ? 'header-action--bump' : ''}`}
      aria-label={location.pathname === '/cart' ? 'Back to games' : `Shopping cart, ${cartItems.length} items`}
      >
        {location.pathname === '/cart' ? '← Back' : 'Cart'}
        {cartItems.length > 0 && location.pathname !== '/cart' && (
          <span className='cart-count'>
            {cartItems.length}
          </span>
        )}
      </button>
    </nav>
  )
}

export default Cartbtn;