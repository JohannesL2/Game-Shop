import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Cartbtn from './CartBtn';
import LoginBtn from './LoginBtn';
import UserAvatar from './UserAvatar';

const Header = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, [auth]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to="/" aria-label="LevelUp Store home">
          <img src="/Logo.png" alt="" />
          <span>LevelUp <strong>Store</strong></span>
        </Link>
        <nav className="site-header__nav" aria-label="Main navigation">
          <Link to="/">Discover</Link>
          <a href="/#games">Browse games</a>
        </nav>
        <div className="site-header__actions">
          <Cartbtn />
          {user ? <UserAvatar /> : <LoginBtn />}
        </div>
      </div>
    </header>
  );
};

export default Header;
