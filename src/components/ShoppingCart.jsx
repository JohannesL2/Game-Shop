import { useContext, useState } from "react";
import { CartContext } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { FaTrash } from 'react-icons/fa';

const Cart = () => {
  const {cartItems, addToCart, removeFromCart, clearCart, getCartTotal} = useContext(CartContext);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderedItemsSnapshot, setOrderedItemsSnapshot] = useState([]);

  const navigate = useNavigate();

  const handleFakeOrder = () => {
    setOrderedItemsSnapshot([...cartItems]);
    setOrderConfirmed(true);
    setTimeout(() => {
      setOrderConfirmed(false);
      clearCart();
      navigate('/');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-white text-[#0f1013] p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-extrabold text-[#0f1013] mb-6 flex items-center gap-2">
          Shopping Cart
        </h3>

        {cartItems.length === 0 && !orderConfirmed ? (
          <div className="bg-gray-100 rounded-xl p-8 text-center max-w-md mx-auto mt-12">
            <p className="text-lg text-[#333639] mb-4">Your cart is empty</p>
            <button 
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center px-4 py-2 border border-[#ff7045] rounded-md bg-[#ff7045] text-[#17191d] text-xs font-bold cursor-pointer transition-all duration-200 hover:bg-[#ff8560] hover:border-[#ff8560]"
            >
              Continue Shopping
            </button>
          </div>
        ) : orderConfirmed ? (
          <div className="bg-[#17191d] border border-[#282c34] rounded-xl p-8 max-w-lg mx-auto mt-12 text-center shadow-xl">
            <p className="text-xl text-green-400 font-bold mb-3">Tack för din beställning!</p>
            <p className="text-xs text-[#8c959f] mb-6">Din order har lagts till och du skickas strax vidare till startsidan...</p>
            
            <div className="text-left bg-[#0f1013] p-4 rounded-lg border border-[#282c34]">
              <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wide">Order Summary:</h4>
              <ul className="space-y-2 text-xs text-[#8c959f] list-disc list-inside">
                {orderedItemsSnapshot.map((item) => (
                  <li key={item.id}>
                    {item.title} <span className="text-white">({item.quantity} st)</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-100 p-4 rounded-lg flex flex-col justify-between">
                  <div>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h4 className="text-[#0f1013] font-bold text-sm mb-1 truncate">{item.title}</h4>
                    <p className="text-[#ff7045] font-bold text-sm mb-4">{item.price} SEK</p>
                  </div>

                  <div className="flex items-center justify-between bg-gray-200 p-2 rounded">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          if (item.quantity === 1) {
                            removeFromCart(item, true);
                          } else {
                            removeFromCart({...item, quantity: 1});
                          }
                        }}
                        className="w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white rounded transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-black font-bold text-md w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-7 h-7 flex items-center justify-center bg-gray-700 hover:bg-gray-800 text-white rounded transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item, true)}
                      className="p-1.5 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                      title="Ta bort"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#17191d] border border-[#282c34] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="text-base text-white">
                Total: <span className="text-[#ff7045] font-black text-xl ml-2">{getCartTotal()} kr</span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <button 
                  onClick={clearCart}
                  className="px-4 py-2.5 border border-gray-600 rounded-md bg-transparent text-gray-300 text-xs font-bold cursor-pointer transition-all duration-200 hover:bg-white/10 hover:border-gray-400 hover:text-white"
                >
                  Clear Cart
                </button>

                <button 
                  onClick={handleFakeOrder}
                  className="px-5 py-2.5 border border-[#ff7045] rounded-md bg-[#ff7045] text-[#17191d] text-xs font-bold cursor-pointer transition-all duration-200 hover:bg-[#ff8560] hover:border-[#ff8560] hover:shadow-[0_4px_12px_rgba(255,112,69,0.4)] active:scale-95"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;