// src/PostDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        return fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
      })
      .then(res => res.json())
      .then(setUser);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(res => res.json())
      .then(setComments);
  }, [id]);

  if (!post || !user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">← Back to Home</Link>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <h3>User Info</h3>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Company:</b> {user.company.name}</p>

      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment.id} style={{ marginTop: '10px', border: '1px solid lightgray', padding: '10px' }}>
          <p><b>{comment.name}</b> ({comment.email})</p>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostDetails;
