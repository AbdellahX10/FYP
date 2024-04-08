import React from "react";
import { useState, useEffect } from 'react';
import WatchCard from './WatchCard';
import Grid from '@mui/material/Grid';
import jwt_decode from "jwt-decode"


const WatchList = () => {

  const [watches, setWatches] = useState([]);

  useEffect(() => {
    const fetchWatches = async () => {
      try {
        const token = localStorage.getItem("authTokens");
        let queryParams = '';
        if (token) {
          const decoded = jwt_decode(token);
          const user_id = decoded.user_id;
          const username = decoded.username;
          queryParams = `?id=${user_id}&name=${encodeURIComponent(username)}`;
        }
        const response = await fetch(`http://localhost:8000/api/get_watch/${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWatches(data);
      } catch (error) {
        console.error('There was an error fetching the watch data:', error);
      }
    };
  
    fetchWatches();
  }, []);

  const handleRemoveWatch = (modelToRemove) => {
    setWatches(currentWatches => currentWatches.filter(watch => watch.model !== modelToRemove));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <Grid container justifyContent="center">
        {watches.map((watch, index) => (
          <Grid item key={index}>
            <WatchCard make={watch.make} model={watch.model} image={watch.image} onRemove={handleRemoveWatch}/>
          </Grid>
        ))}
      </Grid>
    </div>
    
  );
};

export default WatchList;
