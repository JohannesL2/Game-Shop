import React, { useState, useEffect } from 'react'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const UserAvatar = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  if (!user) return null;

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully")
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
  <div className='absolute top-5 right-30 flex items-center space-x-2 bg-gray-300 p-2 rounded-lg'>
          <img
        src={user.photoURL || "avatar.svg"}
        alt="User Avatar"
        className="w-15 h-15 rounded-full border border-gray-700 p-2"
      />
    <h2> <strong>User:</strong> {user.email}</h2>
    <button 
    onClick={handleSignOut}
    className="p-4 shadow-md z-1 transition-transform duration-300 ease-in-out hover:scale-110 loginBtn">
    Sign Out🚪</button>
    </div>
  )
}

export default UserAvatar