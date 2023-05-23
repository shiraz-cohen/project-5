import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import './Photos.css';

export default function Photos() {
  const [photos, setPhotos] = useState([]); // משתנה סטייט לשמירת התמונות
  const [count, setCount] = useState(10); 
  const [loading, setLoading] = useState(false); // משתנה סטייט לציון האם המידע נטען כרגע
  const { id } = useParams(); 

  useEffect(() => {
    console.log("fetch");
  
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}&_limit=10&_countOfPhotos=${count}`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]); // מעדכן את מערך התמונות על פי המערך המקורי והמידע החדש שהתקבל
         setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, [count]);


  const handleLoadMore = () => {
    setCount((prevPage) => prevPage + 10); 
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
          {/* {loading && <p>Loading...</p>} הצגת הודעה זמנית במעמד טעינת המידע */}
          <div className="load-more-container">
            <button className="load-more-button" onClick={handleLoadMore} disabled={loading}>
              Load More
            </button>
          </div>
        </div>
      ) : (
        <p>No photos found</p>
      )}
      
    </div>
  );
  
}

