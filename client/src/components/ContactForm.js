// src/components/ContactForm.js
import logo from './ActeionLogo.png';
import React, { useState } from 'react';
import './App.css';

function ContactForm() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        message: '',
    });

    const containsNumbers = (str) => /\d/.test(str);
    const specialCharPattern = /[!#$%^&*(),?":{}|<>]/;
    const publicDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'ymail.com'];

    const [errors, setErrors] = useState({});

    const validate = () => {
        let errors = {};
        const emailDomain = formData.email.split('@')[1];
        if (!formData.firstname) {
            errors.firstname='Please enter First Name.';
        }
        else if (containsNumbers(formData.firstname)) {
            errors.firstname='The First Name contains numbers. Please enter a First Name without numbers.';
        }
        else if (!formData.lastname) {
            errors.lastname='Please enter Last Name.';
        }
        else if (containsNumbers(formData.lastname)) {
            errors.lastname='The Last Name contains numbers. Please enter a Last Name without numbers.';
        }
        else if (!formData.email) {
            errors.email='Please enter Email.';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email='Please enter valid Email.';
        }
        else if (specialCharPattern.test(formData.email)) {
            errors.email='The Email contains special charectors. Please enter a Email without special charectors.';
        }
        else if (emailDomain && publicDomains.includes(emailDomain.toLowerCase())) {
            errors.email='Please enter work email.';
        }
        else if (formData.phone.trim() !== '' && !/^\d{10}$/.test(formData.phone)) {
            errors.phone='Please enter valid phone.';
        }
        else if (!formData.message) {
            errors.message='Please enter Message.';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alert('Form submitted successfully');
                    setFormData({
                        firstname: '',
                        lastname: '',
                        email: '',
                        phone: '',
                        message: '',
                    });
                } else {
                    alert('Error sending message', response.data.error);
                }
            } catch (error) {
                alert('Network error');
            }
        } else {
            setErrors(errors);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="form-container">
		<div className="form-header">
			<img src={logo} className="App-logo" alt="logo"/>
			<h2 className="form-title">Contact Us Form</h2>
		</div><br/><br/>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="column">
                        <label htmlFor="firstname" className="form-label">First Name:</label>
                        <input type="text" id="firstname" name="firstname" value={formData.firstname} className="form-input" onChange={handleChange}/>
                        {errors.firstname && <p className='error-message'>{errors.firstname}</p>}
                    </div>
                    <div className="column columnright">
                        <label htmlFor="lastname" className="form-label">Last Name:</label>
                        <input type="text" id="lastname" name="lastname" value={formData.lastname} className="form-input" onChange={handleChange}/>
                        {errors.lastname && <p className='error-message'>{errors.lastname}</p>}
                    </div>
                </div>
                <div className="row">
                    <div className="column">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="text" id="email" name="email" value={formData.email} className="form-input" onChange={handleChange}/>
                        {errors.email && <p className='error-message'>{errors.email}</p>}
                    </div>
                    <div className="column columnright">
                        <label htmlFor="phone" className="form-label">Phone:</label>
                        <input type="text" id="phone" name="phone" value={formData.phone} className="form-input" onChange={handleChange}/>
                        {errors.phone && <p className='error-message'>{errors.phone}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="message" className="form-label">Message:</label>
                    <textarea id="message" maxLength="1499" rows="6" className="form-input" type="text" name="message" value={formData.message} onChange={handleChange}/>
                    {errors.message && <p className='error-message'>{errors.message}</p>}
                </div>
                <div className="submit-button-containercenter">
                    <button type="submit" className="submit-button">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
