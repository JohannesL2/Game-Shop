import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const LoginBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleClick = () => {
    if (location.pathname === '/LoginPage') {
      navigate('/');
    } else {
      navigate('/LoginPage');
    }
  }

  return (
    <div>
      <button onClick={handleClick} className='fixed top-5 right-25 p-4 shadow-md z-1 transition-transform duration-300 ease-in-out hover:scale-110 loginBtn'>{location.pathname === '/LoginPage' ? '⬅️' : '🔐'}</button>
    </div>
  )
}

export default LoginBtn