import React, { useState } from 'react';
import './RegisterPage.css';
import axios from 'axios';
import { UserAccountCreation } from '../../interfaces/UserAccount'; 
import { BadRequestError, NotFoundError } from '../../errors/HttpErrors';

function RegisterPage() {
    const [formData, setFormData] = useState<UserAccountCreation>({
        address: '',
        city: '',
        country: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        username: ''
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        for (const [key, value] of Object.entries(formData)) {
            if (!value && key !== 'id') {
                setError(`Please fill in the ${key} field`);
                return;
            }
        }
        

        setError(null);
        setSuccess(null);
        try {
            const response = await axios.post('http://localhost:8080/users/register', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setSuccess('Registration successful!');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response) {
                    if (err.response.status === 400) {
                        setError('Invalid data submitted');
                    } else if (err.response.status === 404) {
                        setError('API endpoint not found');
                    }
                }
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="register-container">
            <h3>Start Your Journey</h3>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} />
                <input type="text" name="city" placeholder="City" onChange={handleChange} />
                <input type="text" name="country" placeholder="Country" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;
