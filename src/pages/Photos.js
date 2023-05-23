import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Photos.css';

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    console.log("fach");
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}&_limit=${count}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [count, id]);

  const handleLoadMore = () => {
    setCount((prevCount) => prevCount + 10);
  };

  return (
    <div>
      <h2>Photos</h2>
      {Array.isArray(photos) && photos.length > 0 ? (
        <div className="photos-container">
          {photos.map((photo) => (
            <div className="photo-wrapper" key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
          ))}
          {loading && <p>Loading...</p>}
          <div className="load-more-container">
            <button className="load-more-button" onClick={handleLoadMore} disabled={loading}>
              Load more
            </button>
          </div>
        </div>
      ) : (
       
         <p>No photos found</p>
      )}
    </div>
  );
}

