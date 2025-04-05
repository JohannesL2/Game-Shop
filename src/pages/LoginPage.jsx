import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import {auth} from "../firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { setDoc } from "firebase/firestore"
import UserAvatar from "../components/UserAvatar"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        setUser(userCredential.user);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        createdAt: new Date(),
      })

        } catch(error) {
          const errorCode = (error.errorCode)
          const errorMessage = (error.message)
        }
}

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
          setUser(userCredential.user)
        }
        catch(error) {
          const errorCode = (error.code);
          const errorMessage = (error.message);
        }
    }

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      ///Sign out successful
    } catch(error) {
      console.error(error.message)
      ///Error
  }
}

  return (
    <div>
      <h2 className="text-lg font-bold">Login or Sign-up</h2>
      <div className="block text-gray-700 text-lg font-bold mb-2 p-4">
      <input className="w-full p-4 bg-gray-200 focus:bg-gray-100" type="text" placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />
      <input className="w-full mt-4 p-4 bg-gray-200 focus:bg-gray-100" type="password" placeholder="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn} className='w-full mt-4 p-4 rounded-none shadow-md z-1 transition-transform duration-300 ease-in-out hover:scale-105 loginBtn'>Login 🔐</button>
      <button onClick={handleRegister} className='w-full mt-2 p-4 rounded-none shadow-md z-1 transition-transform duration-300 ease-in-out hover:scale-105 loginBtn'>Register 📝</button>
      </div>
    </div>
  )
}

export default LoginPage