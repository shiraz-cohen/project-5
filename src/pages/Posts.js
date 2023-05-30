import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import './Posts.css'

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentsMap, setCommentsMap] = useState({}); //keep comments to avoid Unnecessary readings to the server
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  const handleBold = (postId) => {
    if (selectedPostId === postId) { // For the second click of the user to hide the comments and to cancel bold mode
      setSelectedPostId(null);
      setComments([]);
    } else {
      setSelectedPostId(postId);
      if (commentsMap[postId]) { //check if postId who selected already exist
        setComments(commentsMap[postId]);
      } else {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
          .then((response) => response.json())
          .then((data) => {
            setComments(data);
            setCommentsMap({ ...commentsMap, [postId]: data });
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }
  };


  return (
    <div className="posts-container">
      <h2>Posts</h2>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <div><button onClick={() => handleBold(post.id)}>bold</button></div>
            <span
              style={{
                fontWeight: selectedPostId === post.id ? 'bold' : 'normal',
              }}>
              <div className="post-title">{post.title}</div><br />
              <div className="post-body">
                {post.body}
              </div>
            </span>

            {selectedPostId === post.id && (
              <ul className="comments-list">
                {comments.map((comment) => (
                  <li key={comment.id} className="comment-item">
                    <span className="comment-info">
                      name: {comment.name}<br />
                      email: {comment.email}<br />
                    </span>
                    <span className="comment-body">
                      body: {comment.body}<br />
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
