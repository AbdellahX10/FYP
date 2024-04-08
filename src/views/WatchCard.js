import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import jwt_decode from "jwt-decode"

function WatchCard({ image, make, model, onRemove }) {

  const handleClick = async () => {
    const token = localStorage.getItem("authTokens");
    const decoded = jwt_decode(token)
    var user_id = decoded.user_id
     
      try {
        const response = await fetch('http://localhost:8000/api/remove_from_watchlist/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: user_id,
            make: make, 
            model: model,
            imageUrl: image,
          }),
        });
  
        if (response.ok) {
          console.log("Watch removed from WatchList successfully");
          onRemove(model);
        } else {
          console.error("Failed to add remove from WatchList");
        }
      } catch (error) {
        console.error("Error removing watch to WatchList", error);
        
      }
    
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2, position: 'relative' }}> 
      <CardMedia
        component="img"
        width="300"
        height="300"
        image={image}
        alt={make}
        sx={{ objectFit: 'contain' }}
      />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography gutterBottom variant="h5" component="div">
          {make}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {model}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ position: 'absolute', top: 0, right: 0 }}> 
        <IconButton aria-label="delete" size="small" onClick={handleClick}>  
          <DeleteIcon sx={{ color: '#ed6464' }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default WatchCard;