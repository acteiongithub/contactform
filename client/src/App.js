// src/App.js

import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import UsersList from './DataDisplay';

const App = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleFormSubmit = () => {
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 120000); // Reset form page after a short period 2 minutes
    };

    return (
        <div>
            <ContactForm  onFormSubmit={handleFormSubmit} />
            {formSubmitted && <UsersList />}
        </div>
    );
};

export default App;