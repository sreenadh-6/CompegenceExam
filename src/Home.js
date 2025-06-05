// src/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(setUsers);

        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(setPosts);
    }, []);

    // Filter users based on search
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Users and Their Posts</h1>
                <input
                    type="text"
                    placeholder="Search users"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '8px', borderRadius: '4px', border: '1px solid gray' }}
                />
            </div>

            {filteredUsers.map(user => {
                const userPosts = posts.filter(post => post.userId === user.id);
                return (
                    <div key={user.id} style={{ border: '2px solid #444', margin: '15px 0', padding: '15px', borderRadius: '8px' }}>
                        <h2>{user.name} ({user.username})</h2>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        <p><strong>Website:</strong> {user.website}</p>
                        <p><strong>Company:</strong> {user.company.name}</p>
                        <p><strong>Address:</strong> {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</p>

                        <h3 style={{ marginTop: '10px' }}>Posts:</h3>
                        {userPosts.length === 0 ? (
                            <p style={{ fontStyle: 'italic', color: 'gray' }}>No posts available.</p>
                        ) : (
                            userPosts.map(post => (
                                <div key={post.id} style={{ border: '1px solid #ccc', margin: '8px 0', padding: '8px', borderRadius: '6px' }}>
                                    <p>
                                        <strong>Title:</strong>{' '}
                                        <Link
                                            to={`/post/${post.id}`}
                                            title="Click here"
                                            style={{
                                                fontWeight: 'bold',
                                                fontSize: '1.1em',
                                                color: '#007bff',
                                                textDecoration: 'none',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {post.title}
                                        </Link>
                                    </p>
                                    <p><strong>Description:</strong> {post.body}</p>
                                </div>
                            ))
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default Home;
