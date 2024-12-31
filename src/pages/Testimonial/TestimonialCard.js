import React from 'react';

const TestimonialCard = ({ name, comment, profession, image }) => {
  // Check if the image is a valid hex color
  const isColor = /^#[0-9A-F]{6}$/i.test(image);

  return (
    <div className="testimonial-item  border rounded p-4 m-1 ">
      <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
      <p>{comment}</p>
      <div className="d-flex align-items-center ">
        {isColor ? (
          // Render a circle with the random color as background
          <div
            className="img-fluid flex-shrink-0 rounded-circle"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: image,
            }}
          ></div>
        ) : (
          // Render the image if it's a URL
          <img
            className="img-fluid flex-shrink-0 rounded-circle"
            src={image}
            alt="Client"
            style={{ width: '50px', height: '50px' }}
          />
        )}
        <div className="ps-3">
          <h5 className="mb-1">{name}</h5>
          <small>{profession}</small>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
