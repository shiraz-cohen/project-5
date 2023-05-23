import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Photos.css';

export default function Photos() {
  const [photos, setPhotos] = useState([]); // משתנה סטייט לשמירת התמונות
  const [page, setPage] = useState(1); // משתנה סטייט לשמירת מספר הדף הנוכחי
  const [loading, setLoading] = useState(false); // משתנה סטייט לציון האם המידע נטען כרגע
  const observer = useRef(); // משתנה רפרנס לצופה האינטרסקשיין
  const { id } = useParams(); // קבלת הפרמטר id מה-URL באמצעות פונקציית useParams של react-router-dom

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}&_page=${page}&_limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]); // מעדכן את מערך התמונות על פי המערך המקורי והמידע החדש שהתקבל
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
        setPage((prevPage) => prevPage + 1); // מעדכן את מספר הדף לעמוד הבא כאשר האינטרסקשיין נכנס לתצוגה
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (observer.current && observerElement.current) {
      observer.current.observe(observerElement.current); // מתחיל לצפות על אלמנט התצוגה האחראי לטעינת המידע הנוסף
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect(); // מנתק את הצופה האינטרסקשיין כאשר הקומפוננטה נמחקת
      }
    };
  }, []);

  const observerElement = useRef(null); // משתנה רפרנס לאלמנט התצוגה שהוא גם האלמנט שהצופה מצפה עליו

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // פונקציה המתבצעת בלחיצה על הכפתור "Load More" ומגדילה את מספר הדף ב-1
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
          {loading && <p>Loading...</p>} {/* הצגת הודעה זמנית במעמד טעינת המידע */}
          <div ref={observerElement} className="observer-element"></div> {/* אלמנט התצוגה שהצופה מצפה עליו */}
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

