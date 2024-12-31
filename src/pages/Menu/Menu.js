import React, { useState, useEffect } from 'react';
import menuImage1 from '../../assets/img/menu-1.jpg';
import menuImage2 from '../../assets/img/menu-2.jpg';
import menuImage3 from '../../assets/img/menu-3.jpg';
import menuImage4 from '../../assets/img/menu-4.jpg';
import menuImage5 from '../../assets/img/menu-5.jpg';
import menuImage6 from '../../assets/img/menu-6.jpg';
import menuImage7 from '../../assets/img/menu-7.jpg';
import menuImage8 from '../../assets/img/menu-8.jpg';
import MenuItem from './MenuItem';
import Swal from 'sweetalert2'; // Import SweetAlert

const Menu = () => {
  const [activeTab, setActiveTab] = useState('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
  });

  const breakfastItems = [
    { name: 'Chicken Burger Deluxe', img: menuImage1 },
    { name: 'Egg Sandwich Special', img: menuImage2 },
    { name: 'Blueberry Pancakes', img: menuImage3 },
    { name: 'Cinnamon French Toast', img: menuImage4 },
    { name: 'Classic Avocado Toast', img: menuImage5 },
    { name: 'Granola Cereal Bowl', img: menuImage6 },
    { name: 'Fresh Fruit Salad', img: menuImage7 },
    { name: 'Cheese Omelette', img: menuImage8 },
  ];

  const lunchItems = [
    { name: 'Grilled Chicken Wrap', img: menuImage1 },
    { name: 'Turkey Club Sandwich', img: menuImage2 },
    { name: 'Caesar Salad', img: menuImage3 },
    { name: 'Spaghetti Carbonara', img: menuImage4 },
    { name: 'Beef Tacos', img: menuImage5 },
    { name: 'Vegetarian Pizza', img: menuImage6 },
    { name: 'BBQ Pulled Pork', img: menuImage7 },
    { name: 'Mushroom Risotto', img: menuImage8 },
  ];

  const dinnerItems = [
    { name: 'Steak and Potatoes', img: menuImage1 },
    { name: 'Lemon Herb Salmon', img: menuImage2 },
    { name: 'Chicken Alfredo', img: menuImage3 },
    { name: 'Vegetable Stir Fry', img: menuImage4 },
    { name: 'Seafood Paella', img: menuImage5 },
    { name: 'Lamb Chops', img: menuImage6 },
    { name: 'Beef Wellington', img: menuImage7 },
    { name: 'Shrimp Scampi', img: menuImage8 },
  ];

  const generatePrice = (index) => `$${(Math.floor(Math.random() * 40) + 10)}.99`;

  useEffect(() => {
    const setPrices = (items) => items.map((item, index) => ({ ...item, price: generatePrice(index) }));
    setMenuItems({
      breakfast: setPrices(breakfastItems),
      lunch: setPrices(lunchItems),
      dinner: setPrices(dinnerItems),
    });
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const getItems = () => {
    const filteredItems = menuItems[activeTab].filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    return filteredItems;
  };

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleRating = async (itemName, rating) => {
    const ratingData = {
      itemName: itemName,
      rating: rating,
    };

    console.log('Rating Data:', ratingData);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ratingData),
      });

      console.log('HTTP Status:', response.status);

      if (response.ok) {
        Swal.fire({
          title: 'Your rating has been submitted!',
          text: `Thank you for rating "${itemName}". You gave it ${rating} stars. Your feedback helps us improve our menu!`,
          icon: 'success',
          confirmButtonText: 'Got it!',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'There was an error submitting your rating.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
            <h1 className="mb-5">Most Popular Items</h1>
          </div>

          {/* Search Bar */}
          <div className="row mb-4">
            <div className="col-12 d-flex justify-content-center">
              <div className="search-bar-container w-100" style={{ maxWidth: '500px', position: 'relative' }}>
                <input
                  type="text"
                  className="form-control search-bar-input"
                  placeholder="Search for menu items..."
                  value={searchQuery}
                  onChange={handleSearch}
                  style={{ paddingRight: '40px' }}
                />
                <i
                  className="fa fa-search search-bar-icon"
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#aaa',
                  }}
                ></i>
              </div>
            </div>
          </div>

          <div className="tab-class text-center">
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              {['breakfast', 'lunch', 'dinner'].map((tab) => (
                <li className="nav-item" key={tab}>
                  <a
                    className={`d-flex align-items-center text-start mx-3 pb-3 ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab)}
                  >
                    <i className={`fa ${tab === 'breakfast' ? 'fa-coffee' : tab === 'lunch' ? 'fa-hamburger' : 'fa-utensils'} fa-2x text-primary`}></i>
                    <div className="ps-3">
                      <small className="text-body">{tab.charAt(0).toUpperCase() + tab.slice(1)}</small>
                      <h6 className="mt-n1 mb-0">{tab.charAt(0).toUpperCase() + tab.slice(1)}</h6>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            <div className="tab-content">
              <div className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  {getItems().map((item, index) => (
                    <MenuItem
                      key={index}
                      img={item.img}
                      name={item.name}
                      price={item.price}
                      onRate={handleRating}
                    />
                  ))}
                  {getItems().length === 0 && (
                    <div className="col-12 text-center">
                      <p className="text-muted">No items found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
