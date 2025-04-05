import { useState, useEffect } from "react"
import Cartbtn from "./CartBtn"
import { Link } from "react-router-dom"
import LoginBtn from "./LoginBtn"
import UserAvatar from "./UserAvatar"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const Header = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }, [auth]);

  return (
    <header>
      <div className="container mx-auto flex items-center">
      <div className='flex items-center justify-center space-x-3 mb-6'>
      <Link to='/'>
      <img className='size-30' src="Logo.png" alt="" />
      </Link>
      <h1 className='text-3xl font-bold'>LevelUp Store</h1>
      </div>
      <Cartbtn/>
      {user ? <UserAvatar/> : <LoginBtn/>}
      </div>
    </header>
  )
}

export default Header