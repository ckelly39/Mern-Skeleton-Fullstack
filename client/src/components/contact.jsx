import React, { useState, useContext } from 'react';
import { createContact } from '../api/api-contact';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
    const { isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Form state management
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if user is logged in
        if (!isAuthenticated) {
            alert('Please sign in to submit a contact!');
            navigate('/signin');
            return;
        }
        
        setError('');
        setLoading(true);
        
        try {
            await createContact(formData);
            setSuccess(true);
            alert('Contact saved successfully!');
            
            // Reset form
            setFormData({
                firstname: '',
                lastname: '',
                email: ''
            });
            
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err.error || 'Failed to save contact');
            alert('Error: ' + (err.error || 'Failed to save contact'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-panel">
            <h2 className="contact-heading">Contact Information</h2>
            
            {/* Contact details */}
            <div className="contact-details">
                <p><strong>Name:</strong> Kelly Cyusa</p>
                <p><strong>Email:</strong> ckelly39@my.centennialcollege.ca</p>
                <p><strong>Phone:</strong> (437) 609-5923</p>
                <p><strong>Address:</strong> 94 Paul Rouge, Toronto, ON</p>
            </div>
            
            {/* Social links */}
            <div className="social-links">
                <p><strong>Connect with me:</strong></p>
                <div className="social-links-container">
                    <a href="https://www.linkedin.com/in/kelly-cyusa">LinkedIn</a>
                    <a href="https://github.com/ckelly39">GitHub</a>
                </div>
            </div>
            
            {/* Contact form */}
            <div className="contact-form">
                <h3 className="form-heading">Send Me a Message (Saved to Database)</h3>
                
                {!isAuthenticated && (
                    <p style={{ color: '#f44336', fontWeight: 'bold' }}>
                        ⚠️ Please sign in to submit a contact!
                    </p>
                )}
                
                {success && (
                    <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                        ✅ Contact saved successfully!
                    </p>
                )}
                
                <form onSubmit={handleSubmit}>
                    {/* Name inputs */}
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="firstname">First Name</label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    
                    {/* Email */}
                    <div className="form-field">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {error && <p style={{ color: '#f44336' }}>{error}</p>}
                    
                    {/* Submit button */}
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading || !isAuthenticated}
                    >
                        {loading ? 'Saving...' : 'Save Contact'}
                    </button>
                </form>
            </div>
        </div>
    );
}