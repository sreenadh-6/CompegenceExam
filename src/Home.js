// src/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(setPosts);

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then(setUsers);
    }, []);

    const getUserName = (userId) => {
        const user = users.find(u => u.id === userId);
        if (!user) return null;  // Optional: handle case if user not found
        return {
            name: user.name,
            username: user.username
        };
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Posts</h1>
            {posts.map(post => (
                <div key={post.id} style={{ border: '1px solid gray', margin: '10px 0', padding: '10px' }}>
                    <p>
                        <strong>Title: </strong>
                        <Link to={`/post/${post.id}`} style={{ fontWeight: 'bold', fontSize: '1.2em' }}>
                            {post.title}
                        </Link>
                    </p>
                    <small><b>Author:</b> {getUserName(post.userId).name}</small><br />
                    <small><p><strong><b>Description:</b> </strong>{post.body}</p></small><br />
                    <small><b>Username:</b> {getUserName(post.userId).username}</small><br />
                </div>
            ))}
        </div>
    );
}

export default Home;
