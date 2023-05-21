// import React, { useEffect, useState } from 'react';

// export default function Posts () {
//     const [posts, setPosts] = useState([]);
//     const [comments, setComments] = useState([]);
//     const [selector, setSelector] = useState('');
//     const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
//     const id= authorizedUser.id;
//     useEffect(  ()=> {
//       fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
//         .then((response) => response.json())
//         .then(data=>setPosts(data))
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     },[id]);

//     const handleBold = (postId) => {
//       setSelector(postId);
//       fetch(`https://jsonplaceholder.typicode.com/users/${postId}/posts/comments`)
//         .then((response) => response.json())
//         .then(data=>setComments(data))
//         .catch((error) => {
//           console.error('Error:', error);
//         });
        

//     };

//     return (
//       <div>
//         <h2>Posts</h2>
//         <ul>
//           {posts.map((post) => (
//               <li key={post.id}> 
//               <button onClick={() => handleBold(post.id)}>bold</button>
//             <span
//               style={{
//                 fontWeight: selector === post.id ? 'bold' : 'normal',
//               }}>
//               "id": {post.id} <br />
//               "title": {post.title}<br />
//               "body": {post.body} <br />
//               </span>
//               <ul>
//                 {comments.map((comment) => (
//                 <li key={comment.id}>
//                   "id": {comment.id} <br />
//                   "name": {comment.name}<br />
//                   "email": {comment.email}<br/>
//                   "body": {comment.body} <br />
              
//               </li>
//           ))}
//         </ul>
//             </li>
//           ))}
//         </ul>

        
//       </div>
//     );
//   };

import React, { useEffect, useState } from 'react';

export default function Posts () {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
  const id = authorizedUser.id;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
      .then((response) => response.json())
      .then(data => setPosts(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  const handleBold = (postId) => {
    if (selectedPostId === postId) {
      setSelectedPostId(null);
      setComments([]);
    } else {
      setSelectedPostId(postId);
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((response) => response.json())
        .then(data => setComments(data))
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}> 
            <button onClick={() => handleBold(post.id)}>bold</button>
            <span
              style={{
                fontWeight: selectedPostId === post.id ? 'bold' : 'normal',
              }}>
              "title": {post.title}<br />
              "body": {post.body} <br />
            </span>
            {selectedPostId === post.id && (
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id}>
                   
                    "name": {comment.name}<br />
                    "email": {comment.email}<br/>
                    "body": {comment.body} <br />
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


