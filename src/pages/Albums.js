import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Albums.css';

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);

  return (
    <div className="albums-container">
      <h2>Albums</h2>
      <ul className="albums-list">
        {albums.map((album) => (
          <li key={album.id} className="album-item">
            <Link to={`${album.id}/photos`} className="album-link">
              <button className="album-button">{album.title}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
