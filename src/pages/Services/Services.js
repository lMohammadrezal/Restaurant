import React from 'react';
import ServiceCard from './ServiceCard';

const Services = ({ limit }) => {
    const services = [
        { icon: "fa-user-tie", title: "Master Chefs", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam", delay: "0.1s" },
        { icon: "fa-utensils", title: "Quality Food", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam", delay: "0.3s" },
        { icon: "fa-cart-plus", title: "Online Order", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam", delay: "0.5s" },
        { icon: "fa-headset", title: "24/7 Service", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam", delay: "0.7s" },
        { icon: "fa-user-tie", title: "Master Chefs", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam", delay: "0.1s" },
        { icon: "fa-utensils", title: "Quality Food", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam", delay: "0.3s" },
        { icon: "fa-cart-plus", title: "Online Order", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam", delay: "0.5s" },
        { icon: "fa-headset", title: "24/7 Service", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam", delay: "0.7s" },
    ];

    // Limit the number of services if limit is provided
    const limitedServices = limit ? services.slice(0, limit) : services;

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h5 className="section-title ff-secondary text-center text-primary fw-normal">Our Services</h5>
                    <h1 className="mb-5">Explore Our Services</h1>
                </div>
                <div className="row g-4 ">
                    {limitedServices.map((service, index) => (
                        <ServiceCard 
                            key={index}
                            icon={service.icon}
                            title={service.title}
                            description={service.description}
                            delay={service.delay}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;
