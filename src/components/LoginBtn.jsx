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
      <button onClick={handleClick} className="header-action">
        {location.pathname === '/LoginPage' ? 'Back' : 'Sign in'}
      </button>
    </div>
  )
}

export default LoginBtn