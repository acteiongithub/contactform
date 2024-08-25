import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/customers');
            setUsers(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Existing Customers</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        {/* Add other table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {users.map(item => (
                    <tr key={item.customerid}>
                        <td>{item.customerid}</td>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.message}</td>
                        {/* Render other table data as needed */}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList;
