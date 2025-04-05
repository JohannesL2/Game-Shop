import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h2 className='text-lg font-bold'>404 Not Found</h2>
      <Link to='/'>
      <button className='mt-4'>Go back</button>
      </Link>
    </div>
  )
}

export default NotFound