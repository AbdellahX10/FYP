import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Box, FormControl, InputLabel, Select, MenuItem, Grid, Card, CardMedia } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import ZoomPlugin from 'chartjs-plugin-zoom';
import 'chart.js/auto';
import ClockLoader from "react-spinners/ClockLoader";
import jwt_decode from "jwt-decode"
import Button from '@mui/material/Button';




ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ZoomPlugin);


const ComboBox = ({ setPredictedPriceData, setLoading }) => {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedImageUrl, setSelectedImageUrl] = useState('');

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkFavouriteStatus = async () => {
      if (!selectedModel) return;
  
      const token = localStorage.getItem("authTokens");
      const decoded = jwt_decode(token);
      const user_id = decoded.user_id;
  
      try {
        const response = await fetch(`http://localhost:8000/api/check_favourite/?userID=${user_id}&model=${selectedModel}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setIsSaved(data.isFavourite);
        } else {
          console.error("Failed to check favourite status");
        }
      } catch (error) {
        console.error("Error checking favourite status", error);
      }
    };
  
    checkFavouriteStatus();
  }, [selectedModel]); 

  const handleClick = async () => {
    setIsSaved(!isSaved);
    const token = localStorage.getItem("authTokens"); 
    const decoded = jwt_decode(token)
    var user_id = decoded.user_id
     
      try {
        const response = await fetch('http://localhost:8000/api/watchlist/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: user_id,
            make: selectedMake, 
            model: selectedModel,
            imageUrl: selectedImageUrl,
            stat: !!isSaved,
          }),
        });
  
        if (response.ok) {
          console.log("Watch added to WatchList successfully");
        } else {
          console.error("Failed to add watch to WatchList");
          setIsSaved(false); 
        }
      } catch (error) {
        console.error("Error saving watch to WatchList", error);
        setIsSaved(false); 
      }
    
  };

  const modelsByMake = {
    Rolex: {
      Daytona: ['116506-0001', '116520-0016'],
      'GMT-Master': ['126715', '116758SARU', '126711CHNR', '126720VTNR-0002'],
      'Sky-Dweller': ['336935', '326938-0001', '326935-0004', '336934'],
    },
    
    'Audemars Piguet': {
      'Royal Oak': ['15202ST.OO.0944ST.01', '15202ST.OO.0944ST.02', '15202ST.OO.0944ST.03', '15202ST.OO.1240ST.01', '15510ST.OO.1320ST.05', '15500ST.OO.1220ST.01'],
    },
    'Patek Philippe': {
      Aquanaut: ['5168G-010', '5968G-010', '5066A'],
      Nautilus: ['5711 1A-014', '5712 1A', '5711 1R'],
    },
    Hublot: {
      'Big Bang': ['411.JR.4901.RT', '411.OX.9910.LR.0999', '441.OX.1180.RX.1704'],
    },
  };

  const modelImageUrls = {
    '116506-0001': 'https://cdn.watchcharts.com/removebg/33cd3e0d-a51c-450a-9e87-ec9c3fdfba09.png?d=400x600',
    '126715': 'https://cdn.watchcharts.com/removebg/ff2ea54e-e076-4b0b-bf86-e1666369a385.png?d=400x600',
    '116758SARU': 'https://cdn.watchcharts.com/removebg/0c8237c9-7631-481c-a528-77c07ab86f5a.png?d=400x600',
    '336935': 'https://cdn.watchcharts.com/removebg/cf53fcd2-9bf0-4562-8ca0-ed570072f8c7.png?d=400x600',
    '326938-0001': 'https://cdn.watchcharts.com/removebg/4ed8618a-cc7d-45b8-a101-bc0afaefd139.png?d=400x600',
    '326935-0004': 'https://cdn.watchcharts.com/removebg/c016f00e-6123-4d4e-a5d9-9eb59a437886.png?d=400x600',
    '5066A': 'https://cdn.watchcharts.com/removebg/88c5df6f-f6ff-492a-9377-1ffc7d56240e.png?d=400x600',
    '5168G-010': 'https://cdn.watchcharts.com/removebg/53550bb9-874f-44ea-93b7-8d62aa34e0df.png?d=400x600',
    '5968G-010': 'https://cdn.watchcharts.com/removebg/fd6c549e-451a-4abc-8226-cb76c0d54db0.png?d=400x600',
    '5711 1A-014': 'https://cdn.watchcharts.com/removebg/b95e64e9-604a-489d-bd7e-33b0edf84cb1.png?d=400x600',
    '5712 1A': 'https://cdn.watchcharts.com/removebg/d13de0e7-b987-4741-8432-93f8a3f72427.png?d=400x600',
    '411.JR.4901.RT': 'https://cdn.watchcharts.com/removebg/6dcb7a03-89a3-46e8-bf62-37e014cafce6.png?d=400x600',
    '411.OX.9910.LR.0999': 'https://cdn.watchcharts.com/removebg/ee596fd3-a5de-4bf0-8255-c3ec685332b1.png?d=400x600',
    '441.OX.1180.RX.1704': 'https://cdn.watchcharts.com/removebg/33b0229d-5c7b-4f84-8d04-a52a4f384673.png?d=400x600',
    '5711 1R': 'https://cdn.watchcharts.com/removebg/220efc9f-6c3c-4832-94bc-1d24087d2f28.png?d=400x600',
    '116520-0016': 'https://cdn.watchcharts.com/removebg/bb1d6890-e08a-4b40-be57-9194c99415a2.png?d=400x600',
    '126711CHNR': 'https://cdn.watchcharts.com/removebg/b951ad08-9631-4d3b-92c5-05d4bced389c.png?d=400x600',
    '126720VTNR-0002': 'https://cdn.watchcharts.com/removebg/25590b0c-b3f8-4c6f-b6bd-0753782bfc3c.png?d=400x600',
    '336934': 'https://cdn.watchcharts.com/removebg/117dc334-a2dd-4330-bceb-6ffd3aa23367.png?d=400x600',
    '15202ST.OO.0944ST.02': 'https://cdn.watchcharts.com/removebg/7c2d5db7-b2d1-4987-80bf-66ea3ea56ab7.png?d=400x600',
    '15202ST.OO.0944ST.01': 'https://cdn.watchcharts.com/removebg/882d20f5-147c-4ea6-9f77-55e795791721.png?d=400x600',
    '15202ST.OO.0944ST.03': 'https://cdn.watchcharts.com/removebg/a1b66b07-2522-45c4-a775-84bc004b8567.png?d=400x600',
    '15202ST.OO.1240ST.01': 'https://cdn.watchcharts.com/removebg/5f32b4be-f017-4801-a987-421b04805ba5.png?d=400x600',
    '15510ST.OO.1320ST.05': 'https://cdn.watchcharts.com/removebg/1e3a55bb-0799-422d-bd02-da2f6669923d.png?d=400x600',
    '15500ST.OO.1220ST.01': 'https://cdn.watchcharts.com/removebg/550024ed-6ed6-4303-aa43-211eb81e9d5a.png?d=400x600',

  };

  const handleMakeChange = (event) => {
    setSelectedMake(event.target.value);
    setSelectedCollection('');
    setSelectedModel('');
  };

  const handleCollectionChange = (event) => {
    setSelectedCollection(event.target.value);
    setSelectedModel('');
  };

  const handleModelChange = async (event) => {
    setSelectedModel(event.target.value);
    const imageUrl = modelImageUrls[event.target.value]; 
    setSelectedImageUrl(imageUrl);

    setIsSaved(false);

    setLoading(true);

    const response = await fetch('http://localhost:8000/api/price_prediction/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        make: selectedMake,
        model: event.target.value,
      }),
    });

    setLoading(false);

    const data = await response.json();
    if(response.ok){
      console.log("Success");
  
    } else{
      console.error("Failed")
    }
    setPredictedPriceData(data.predictedPrice); 
  };

 

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel>Make</InputLabel>
          <Select
            value={selectedMake}
            onChange={handleMakeChange}
            label="Make"
          >
            {Object.keys(modelsByMake).map((make) => (
              <MenuItem key={make} value={make}>
                {make}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth disabled={!selectedMake}>
          <InputLabel>Collection</InputLabel>
          <Select
            value={selectedCollection}
            onChange={handleCollectionChange}
            label="Collection"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {selectedMake && Object.keys(modelsByMake[selectedMake]).map((collection) => (
              <MenuItem key={collection} value={collection}>
                {collection}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth disabled={!selectedCollection}>
          <InputLabel>Model</InputLabel>
          <Select
            value={selectedModel}
            onChange={handleModelChange}
            label="Model"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {selectedCollection && modelsByMake[selectedMake][selectedCollection].map((model) => (
              <MenuItem key={model} value={model}>
                {model}
                
              </MenuItem>
              
            ))}
            
          </Select>
          
        </FormControl>
      </Grid>
      {selectedImageUrl && (
        <Grid item xs={12}>
          <Card>
            <CardMedia
              component="img"
              image={selectedImageUrl}
              alt={selectedModel}
              style={{ height: '250px', objectFit: 'contain', margin: 'auto' }}
            />
        </Card>
        <Box
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          mt={2} 
        >
          <Button
            variant={isSaved ? "outlined" : "contained"}
            onClick={handleClick}
            useEffect
            >
              {isSaved ? 'Remove from WatchList' : 'Save to WatchList'}
          </Button>
        </Box>
      </Grid>
      )}
    </Grid>
  );
};

const MyLineChart = ({ predictedPriceData }) => {

  const token = localStorage.getItem("authTokens")

  if (token){
    const decoded = jwt_decode(token)
    var user_id = decoded.user_id
    var username = decoded.username

}
  

  if (predictedPriceData) {
    const dynamicData = {
      labels: predictedPriceData[3],
      datasets: [
        {
          label: 'Actual',
          backgroundColor: 'rgba(0, 99, 132, 0.2)',
          borderColor: 'rgba(0, 99, 132, 1)',
          borderWidth: 1,
          data: predictedPriceData[0],
        },
        {
          label: 'Price Prediction',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: predictedPriceData[1],
        },

      ],
    };

    const options = {
      responsive: true,
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: 'xy',
          },
          zoom: {
            wheel: {
              enabled: true,
            },
            pinch: {
              enabled: true,
            },
            mode: 'xy',
          },
        },
      },
    };

    return (
      

      <div>
        <Line data={dynamicData} options={options}/>
      </div>
    );
  }
  
};

export default function PricePrediction() {
    

    const defaultTheme = createTheme();

    const [predictedPriceData, setPredictedPriceData] = useState(null);

    const [loading, setLoading] = useState(false)



    return (
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <Container maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Select Watch
          </Typography>
          <ComboBox setPredictedPriceData={setPredictedPriceData} setLoading={setLoading}/>
        </Container>
        {
          loading ?
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <ClockLoader
                color={'#68468f'}
                loading={loading}
                size={80}
                />
            </div>
              :
          
            <Container maxWidth="md" component="main">
                <MyLineChart predictedPriceData={predictedPriceData}/>
            </Container>
        }

      </ThemeProvider>
    );
}