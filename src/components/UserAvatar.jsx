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
    <div className="user-menu">
      <img src={user.photoURL || '/avatar.svg'} alt="" className="user-menu__avatar" />
      <span className="user-menu__email">{user.email}</span>
      <button onClick={handleSignOut} className="header-action">Sign out</button>
    </div>
  );
}

export default UserAvatar