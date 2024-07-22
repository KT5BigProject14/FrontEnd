import React, { createContext, useState, useEffect } from 'react';

export const LikedContext = createContext();

const LikedProvider = ({ children }) => {
  const [likedDocs, setLikedDocs] = useState([]);

  const fetchLikedDocs = async () => {
    const token = sessionStorage.getItem('token');
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    
    try {
      const response = await fetch(`${apiUrl}/retriever/ai/get/like/text`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLikedDocs(Array.isArray(data.documents) ? data.documents : []);
    } catch (error) {
      console.error('Error fetching liked documents:', error);
      setLikedDocs([]);
    }
  };

  useEffect(() => {
    fetchLikedDocs();
  }, []);

  return (
    <LikedContext.Provider value={{ likedDocs, setLikedDocs, fetchLikedDocs }}>
      {children}
    </LikedContext.Provider>
  );
};

export default LikedProvider;