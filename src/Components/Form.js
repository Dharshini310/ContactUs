import React, { useState } from 'react';
import './Form.css';

function Form() {
    const [email, setEmail] = useState('');
    const [suggestions, setSuggestions] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            email,
            suggestions,
        };

        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
              });
              

            if (response.ok) {
                // Optionally reset the form fields
                setEmail('');
                setSuggestions('');
                alert('Thank you for your feedback!');
            } else {
                alert('Failed to submit your feedback. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return ( 
        <div className="form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Contact Us</h2>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                /><br /><br />
                <textarea 
                    placeholder="Enter your suggestions" 
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    required 
                ></textarea><br /><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Form;
