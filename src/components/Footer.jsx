import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed!');
  };

  return (
    <footer className="bg-[#0f1013] text-[#adb5bd] font-sans pt-12 border-t border-[#282c34]">
      <div className="max-w-[1200px] mx-auto px-5 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_2fr] gap-10">
        
        {/* Kolumn 1: Varumärke & Info */}
        <div className="flex flex-col">
          <div className="text-xl font-black text-white tracking-wide mb-3 flex items-center gap-2">
            <Link className="brand" to="/" aria-label="LevelUp Store home">
                      <img src="/Logo.png" alt="" />
                      <span className="text-white">LevelUp <strong>store</strong></span>
                    </Link>
          </div>
          <p className="text-xs leading-relaxed mb-5 text-[#8c959f]">
            LevelUp Store is your ultimate destination for discovering, exploring, and purchasing the latest and greatest games.
          </p>
          <hr className="border-[#282c34] mb-3.5" />
          <p className="text-xs leading-relaxed mb-3.5 text-[#8c959f]">
            Follow us on social media for the latest updates, exclusive content, and special offers.
          </p>
          <div className="flex gap-2.5 flex-wrap">
            <a href="#discord" aria-label="Discord" className="inline-flex items-center justify-center px-3 py-1.5 border border-[#282c34] rounded-md bg-[#17191d] text-[#adb5bd] text-xs font-semibold no-underline transition-all duration-200 hover:border-[#ff7045] hover:text-white hover:-translate-y-0.5">Discord</a>
            <a href="#twitch" aria-label="Twitch" className="inline-flex items-center justify-center px-3 py-1.5 border border-[#282c34] rounded-md bg-[#17191d] text-[#adb5bd] text-xs font-semibold no-underline transition-all duration-200 hover:border-[#ff7045] hover:text-white hover:-translate-y-0.5">Twitch</a>
            <a href="#twitter" aria-label="X / Twitter" className="inline-flex items-center justify-center px-3 py-1.5 border border-[#282c34] rounded-md bg-[#17191d] text-[#adb5bd] text-xs font-semibold no-underline transition-all duration-200 hover:border-[#ff7045] hover:text-white hover:-translate-y-0.5">X</a>
            <a href="#youtube" aria-label="YouTube" className="inline-flex items-center justify-center px-3 py-1.5 border border-[#282c34] rounded-md bg-[#17191d] text-[#adb5bd] text-xs font-semibold no-underline transition-all duration-200 hover:border-[#ff7045] hover:text-white hover:-translate-y-0.5">YouTube</a>
          </div>
        </div>

        {/* Kolumn 2: Navigering */}
        <div>
          <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Explore</h4>
          <ul className="list-none p-0 m-0 space-y-2.5 text-xs">
            <li><a href="#bestsellers" className="text-[#8c959f] no-underline transition-colors duration-200 hover:text-[#ff7045]">Bestsellers</a></li>
            <li><a href="#new" className="text-[#8c959f] no-underline transition-colors duration-200 hover:text-[#ff7045]">New Releases</a></li>
            <li><a href="#upcoming" className="text-[#8c959f] no-underline transition-colors duration-200 hover:text-[#ff7045]">Upcoming Games</a></li>
            <li><a href="#sale" className="text-[#8c959f] no-underline transition-colors duration-200 hover:text-[#ff7045]">Sales & Offers</a></li>
            <li><a href="#giftcards" className="text-[#8c959f] no-underline transition-colors duration-200 hover:text-[#ff7045]">Gift Cards</a></li>
          </ul>
        </div>

        {/* Kolumn 3: Support */}
        <div>
          <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Customer Service</h4>
          <ul className="list-none p-0 m-0 space-y-2.5 text-xs">
            <li><a href="#faq" className="text-[#8c959f] no-underline transition-colors duration-200 hover:text-[#ff7045]">Help Center / FAQ</a></li>
            <li><a href="#orders" className="text-[#8c959f] no-underline transition-colors duration-200 hover:text-[#ff7045]">Order Status</a></li>
            <li><a href="#returns" className="text-[#8c959f] no-underline transition-colors duration-200 hover:text-[#ff7045]">Returns & Refunds</a></li>
            <li><a href="#activate" className="text-[#8c959f] no-underline transition-colors duration-200 hover:text-[#ff7045]">Activate Code</a></li>
            <li><a href="#contact" className="text-[#8c959f] no-underline transition-colors duration-200 hover:text-[#ff7045]">Contact Us</a></li>
          </ul>
        </div>

        {/* Kolumn 4: Nyhetsbrev */}
        <div>
          <h4 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Miss the deal</h4>
          <p className="text-xs leading-relaxed mb-3.5 text-[#8c959f]">
            Get the latest game releases and exclusive discounts directly to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 min-w-[160px] py-2 px-3 bg-[#17191d] border border-[#282c34] rounded-md text-white text-xs outline-none focus:border-[#ff7045] transition-colors duration-200" 
              required 
            />
            <button 
              type="submit" 
              className="px-4 py-2 tracking-tighter border border-[#ff7045] rounded-md bg-[#ff7045] text-[#17191d] text-xs font-extrabold cursor-pointer transition-all duration-200 hover:bg-[#ff8560] hover:border-[#ff8560] hover:shadow-[0_2px_10px_rgba(255,112,69,0.3)] whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottenrad med copyright & länkar */}
      <div className="bg-[#090a0c] py-5 border-t border-[#1a1d24]">
        <div className="max-w-[1200px] mx-auto px-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#6c757d]">
          <p className="m-0">
            &copy; {new Date().getFullYear()} LevelUp Store. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#privacy" className="text-[#6c757d] no-underline transition-colors duration-200 hover:text-[#adb5bd]">Privacy Policy</a>
            <a href="#terms" className="text-[#6c757d] no-underline transition-colors duration-200 hover:text-[#adb5bd]">Terms of Service</a>
            <a href="#cookies" className="text-[#6c757d] no-underline transition-colors duration-200 hover:text-[#adb5bd]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}