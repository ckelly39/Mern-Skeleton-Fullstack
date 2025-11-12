import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to My Portfolio</h1>
            
            <div className="mission-statement">
                <h2>My Mission</h2>
                <p>
                    I strive to create innovative solutions that empower users to achieve their goals.
                    My commitment is to deliver excellence, foster creativity, and build a community of engaged users.
                </p>
            </div>
            
            <div className="navigation-buttons">
                <Link to="/about" className="nav-button">About Us</Link>
                <span> | </span>
                <Link to="/services" className="nav-button">Our Services</Link>
                <span> | </span>
                <Link to="/contact" className="nav-button">Contact</Link>
            </div>
        </div>
    );
}
