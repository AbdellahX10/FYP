import React from 'react';
import Typography from '@mui/material/Typography';

const BlogPost = () => {
  return (
    <div>
        <br></br>
      <Typography variant="h4">Welcome</Typography>
      <br></br>
      <Typography variant="subtitle2">October 12, 2023 by Abdellah</Typography>
      <br></br>

      <Typography variant="body1">
      Welcome to our exclusive web app, your go-to destination for navigating the luxury watch 
      market with confidence and insight. Leveraging cutting-edge AI technology, we provide expertly 
      crafted price predictions and precise valuations, empowering you to make well-informed decisions
       whether you're a seasoned collector or a new enthusiast. Discover the future of luxury watch investment 
       and ownership, tailored to your needs.
      </Typography>
      <br></br>

      <br></br>


      
      <Typography variant="h5">FAQs</Typography>
      <br></br>
      
      <Typography variant="h6"><strong>1. How does the price prediction feature work?</strong></Typography>
      <br></br>
    
      <Typography variant="body1">
      The price prediction feature uses advanced algorithms to analyse historical price data of luxury watches
       over the past three to five years. It identifies trends and patterns to forecast future prices, helping users make 
       informed decisions about buying or selling luxury watches.
      </Typography>
      <br></br>


      <Typography variant="h6"><strong>2. Can I trust the accuracy of the price predictions?</strong></Typography>
      <br></br>
     
      <Typography variant="body1">
      While our AI algorithms are sophisticated and trained on extensive data, it's important to note that all predictions
       are estimates. We strive for accuracy, but market conditions can be unpredictable and influenced by many external factors.
        Therefore, our predictions should be used as one of several tools in making investment decisions.
      </Typography>

      <br></br>


      <Typography variant="h6"><strong>3. How does the watch valuation feature work?</strong></Typography>
      <br></br>
      
      <Typography variant="body1">
      Our valuation feature uses AI to analyse images of your watch's face and clasp that you upload. The AI detects any visible 
      defects such as scratches or cracks and considers these in determining the watch's current market value.
      </Typography>

      <br></br>


      <Typography variant="h6"><strong>4. What types of defects can the AI detect in the valuation process?</strong></Typography>
      <br></br>
      
      <Typography variant="body1">
      The AI is trained to identify various types of physical defects, including but not limited to scratches, cracks, discoloration, and signs of wear and tear.
       However, its accuracy is dependent on the quality and clarity of the images uploaded.
      </Typography>

      <br></br>


      <Typography variant="h6"><strong>5. How should I photograph my watch for an accurate valuation?</strong></Typography>
      <br></br>
      
      <Typography variant="body1">
      For best results, take clear, high-resolution photos in good lighting. Ensure the watch face and clasp are visible and try to capture any details or defects.
       Avoid using filters or editing the photos, as this can affect the AI's ability to accurately assess the condition.
      </Typography>
    </div>
  );
};

export default BlogPost;
