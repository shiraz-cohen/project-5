import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Albums () {
  const [albums, setAlbums] = useState([]);
//   const [comments, setComments] = useState([]);
//   const [selectedPostId, setSelectedPostId] = useState(null);
  const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
  const id = authorizedUser.id;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
      .then((response) => response.json())
      .then(data => setAlbums(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

 
  

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id}> 
          <Link to={`/album/${album.id}/photos`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


