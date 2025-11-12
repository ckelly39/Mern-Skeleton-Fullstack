import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import { signout } from '../api/api-auth';

export default function Layout() {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signout();
            logout();
            navigate('/');
        } catch (err) {
            console.error('Logout failed:', err);
            logout(); // Logout anyway on client side
            navigate('/');
        }
    };

    return (
        <>
            <h1>My Portfolio</h1>
            <nav className="nav-links">
                <Link to="/">Home</Link> | 
                <Link to="/about">About</Link> | 
                <Link to="/services">Services</Link> | 
                <Link to="/project">Project</Link> |
                <Link to="/qualifications">Qualifications</Link> |
                <Link to="/contact">Contact</Link>
                
                {isAuthenticated ? (
                    <>
                        {' | '}
                        <span style={{ color: '#4CAF50' }}>
                            Welcome, {user?.name}!
                        </span>
                        {' | '}
                        <button 
                            onClick={handleLogout}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#f44336',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontSize: 'inherit'
                            }}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        {' | '}
                        <Link to="/signin">Sign In</Link>
                        {' | '}
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
            </nav>
            <br/>
            <hr />
        </>
    );
}