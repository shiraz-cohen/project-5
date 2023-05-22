import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const { id } = useParams();
  // const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
  // const id = authorizedUser.id;

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
      {albums.map((album) => (
        <div key={album.id}>
          {/* <Link to={`/album/${album.id}`}>{album.title}</Link> */}
          <Link to={`${album.id}/photos`}>{album.title}</Link>
        </div>
      ))}
    </div>
  );
};