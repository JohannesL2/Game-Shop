import React from 'react'

const StarRating = ({value}) => {
return (
  <div className="rating">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
    key={star}
    type='radio'
    name="rating-2"
    className={`mask mask-star ${star <= value ? 'bg-orange-700' : 'bg-gray-800'}`}
    aria-label={`${star} star`}
    />
  ))}
  </div>
  )
}

export default StarRating