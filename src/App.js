import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Menu from './pages/Menu/Menu';
import Booking from './pages/Booking/Booking';
import Team from './pages/Team/Team';
import Testimonial from './pages/Testimonial/Testimonial';
import Contact from './pages/Contact/Contact';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/services' element={<Services/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/booking' element={<Booking/>}/>
            <Route path='/team' element={<Team/>}/>
            <Route path='/testimonial' element={<Testimonial/>}/>
            <Route path='/contact' element={<Contact/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>

    </div>
  );
}

export default App;
