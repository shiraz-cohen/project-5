import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Photos.css';

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}&_page=${page}&_limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [page, id]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const handleObserver = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (observer.current && observerElement.current) {
      observer.current.observe(observerElement.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const observerElement = useRef(null);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h2>Photos</h2>
      {Array.isArray(photos) && photos.length > 0 ? (
        <div className="photos-container">
          {photos.map((photo, index) => (
            <div className="photo-wrapper" key={photo.id}>
              <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
          ))}
          {loading && <p>Loading...</p>}
          <div ref={observerElement} className="observer-element"></div>
          <div className="load-more-container">
            <button className="load-more-button" onClick={handleLoadMore} disabled={loading}>
              Load More
            </button>
          </div>
        </div>
      ) : (
        <p>No photos found.</p>
      )}
    </div>
  );
}
