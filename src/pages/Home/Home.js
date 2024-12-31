import React from 'react';
import Services from '../Services/Services';
import About from '../About/About';
import Menu from '../Menu/Menu';
import Booking from '../Booking/Booking';
import Team from '../Team/Team';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <div>
            <Services limit={4}/>
            <About includeTeam={false}/>
            <Menu/>
            <Booking/>
            <Team limit={4}/>
            <Testimonial/>
        </div>
    );
}

export default Home;
