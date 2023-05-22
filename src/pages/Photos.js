import React, { useEffect, useState, useRef } from 'react';

export default function Photos() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  //const { id } = useParams();
  const authorizedUser = JSON.parse(localStorage.getItem('authorizedUser'));
  const id = authorizedUser.id;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}&_page=${page}&_limit=10`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }, [id, page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    }, options);
  }, []);

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current.observe(document.querySelector("#bottom"));
  }, [photos]);

  return (
    <div>
      <h2>Photos</h2>
      {photos.map((photo) => (
        <img key={photo.id} src={photo.thumbnailUrl} alt={photo.title} />
      ))}
      {loading && <div>Loading...</div>}
      <div id="bottom"></div>
    </div>
  );
}

