import { useContext } from "react";
import { CartContext } from "../context/cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {cartItems, addToCart, removeFromCart, clearCart, getCartTotal} = useContext(CartContext);

  const navigate = useNavigate();

return (
  <div>
    <h3 className="text-2xl font-semibold p-4">Shopping cart🛒</h3>

    {cartItems.length === 0 ? (
      <>
      <p>Empty cart</p>
      <button onClick={() => 
        navigate('/')
      }
      className="mt-4"
      >Continue Shopping</button>
      </>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.map((item) => (
          <div key={item.id} className="border border-gray-500 p-4 rounded-lg shadow-md">
            <img src={item.image} alt=""
            className="w-full h-48 object-cover rounded-md mb-4"
            />
          <div>
            <h3>{item.title}</h3>
            <h3>{item.price} kr</h3>
          </div>
            <div>
              <button onClick={() => removeFromCart(item, true)}>🗑️</button>
              <span>{item.quantity}</span>
              <button onClick={() => addToCart(item)}>+</button>
              <button onClick={ () => {
                if (item.quantity === 1) {
                removeFromCart(item, true);
              } else {
                removeFromCart({...item, quantity: 1})
              }
            }}
              >-</button>
              </div>
              </div>
        ))}
        <div>
          <h3>Total: <strong>{getCartTotal()} kr</strong></h3>
        </div>
        <button onClick={() => clearCart()}>Clear Cart</button>
        <button>Proceed to Checkout</button>
        </div>
    )}
  </div>
)
};

export default Cart;