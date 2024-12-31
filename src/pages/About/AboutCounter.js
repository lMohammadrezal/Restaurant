// src/components/Counter/Counter.js
import React, { useState, useEffect } from 'react';

const AboutCounter = ({ endValue, className }) => {
    const [value, setValue] = useState(1);

    useEffect(() => {
        const duration = 2000; // Animation duration in milliseconds
        const stepTime = duration / endValue; // Time per increment
        let currentValue = 1;

        const interval = setInterval(() => {
            currentValue += 1;
            setValue(currentValue);
            if (currentValue >= endValue) {
                clearInterval(interval);
            }
        }, stepTime);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [endValue]);

    return <h1 className={className}>{value}</h1>;
};

export default AboutCounter;
