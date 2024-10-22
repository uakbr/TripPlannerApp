import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>Your Trip Planner</h1>
            </div>
            <nav className={`nav ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/logout">Logout</Link></li>
                </ul>
            </nav>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </header>
    );
}

export default Header;
