import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/cart';
import { FaShoppingCart } from 'react-icons/fa';

const Cartbtn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useContext(CartContext);

  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      setAnimation(true);
      const timer = setTimeout(() => setAnimation(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  const handleClick = () => {
    if (location.pathname === '/cart') {
      navigate('/');
    } else {
      navigate('/cart');
    }
  };

  const isCart = location.pathname === '/cart';

  return (
    <nav>
      <button
        onClick={handleClick}
        className={`header-action flex items-center gap-2 ${animation ? 'header-action--bump' : ''}`}
        aria-label={isCart ? 'Back to games' : `Shopping cart, ${cartItems.length} items`}
      >
        <FaShoppingCart />
        <span>{isCart ? '← Back' : 'Cart'}</span>
        {cartItems.length > 0 && !isCart && (
          <span className='cart-count'>
            {cartItems.length}
          </span>
        )}
      </button>
    </nav>
  );
};

export default Cartbtn;