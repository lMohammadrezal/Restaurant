import React, { useState, useEffect } from 'react';

const MenuItem = ({ img, name, price, onRate }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Retrieve saved ratings from localStorage
    const savedRatings = JSON.parse(localStorage.getItem('ratings')) || {};
    if (savedRatings[name]) {
      setRating(savedRatings[name]); // Set the saved rating if it exists
    }
  }, [name]);

  const handleRating = (value) => {
    setRating(value);
    // Save the rating to localStorage
    const savedRatings = JSON.parse(localStorage.getItem('ratings')) || {};
    savedRatings[name] = value;
    localStorage.setItem('ratings', JSON.stringify(savedRatings));
    
    if (onRate) {
      onRate(name, value); // Send the rating to the parent
    }
  };

  return (
    <div className="col-lg-6 col-md-12">
      <div className="menu-item d-flex align-items-center">
        <img className="flex-shrink-0 img-fluid rounded" src={img} alt={name} style={{ width: '80px' }} />
        <div className="w-100 d-flex flex-column text-start ps-4">
          <h5 className="d-flex justify-content-between border-bottom pb-2">
            <span>{name}</span>
            <span className="text-primary">{price}</span>
          </h5>
          <small className="fst-italic">Ipsum ipsum clita erat amet dolor justo diam</small>
          <div className="d-flex mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={star}
                className={`fa fa-star ${star <= rating ? 'text-warning' : 'text-secondary'}`}
                style={{ cursor: 'pointer', marginRight: '5px' }}
                onClick={() => handleRating(star)}
              ></i>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
