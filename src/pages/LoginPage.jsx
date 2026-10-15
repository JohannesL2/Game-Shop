import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: userCredential.user.email,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Sign-in error:", error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign-out error:", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {user ? (
        <div className="text-center">
          <h2 className="text-[#0f1013] text-xl font-bold mb-2">Välkommen!</h2>
          <p className="text-gray-600 mb-6">{user.email}</p>
          <button 
            onClick={handleSignOut} 
            className="w-full p-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-colors"
          >
            Logga ut 🚪
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold mb-4 text-[#0f1013]">Login or Sign-up</h2>
          <div className="block text-gray-700 text-lg font-bold mb-2">
            <input 
              className="w-full p-4 bg-gray-200 focus:bg-gray-100 rounded-md text-sm outline-none" 
              type="text" 
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              className="w-full mt-4 p-4 bg-gray-200 focus:bg-gray-100 rounded-md text-sm outline-none" 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              onClick={handleSignIn} 
              className='w-full mt-4 p-4 rounded-md shadow-md transition-transform duration-300 ease-in-out hover:scale-105 loginBtn'
            >
              Login
            </button>
            <button 
              onClick={handleRegister} 
              className='w-full mt-2 p-4 rounded-md shadow-md transition-transform duration-300 ease-in-out hover:scale-105 loginBtn'
            >
              Register
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;