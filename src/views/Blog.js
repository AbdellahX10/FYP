import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';


const mainFeaturedPost = {
  title: 'The Watch Specialists powered by AI',
  description:
    "Incorporating AI into the luxury watch market",
  image: 'https://prestige-watches.co.uk/wp-content/uploads/5d0eb37d-d6c6-491c-9d20-2dff69953f6e.jpeg',
  imageText: 'main image description',
};

const featuredPosts = [
  {
    title: 'Audemars Piguet Royal Oak',
    date: 'Jan 03',
    description:
      'The Audemars Piguet 15450ST.OO.1256ST.02 is a variant of the Audemars Piguet 15450ST.',
    image: 'https://cdn.watchcharts.com/removebg/246ba07e-8d16-4ebc-97f6-9f1649c95cf0.png?d=600x600',
    imageLabel: 'Image Text',
  },
  {
    title: 'Rolex Datejust',
    date: 'Jan 06',
    description:
      'The Rolex 16234 is a watch model from the Rolex brand and Datejust collection.',
    image: 'https://cdn.watchcharts.com/removebg/57de104d-1cac-4d75-8485-8c753db7bdae.png?d=600x600',
    imageLabel: 'Image Text',
  },
];

const sidebar = {
  title: 'History',
  description:
    'The Watch Specialist was founded in 2023 by Abdellah Elkeria. We aim to provide users with an accurate insight into the potential future prices of luxury watches and give realistic valuations of second-hand watches',
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'X', icon: XIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};


const defaultTheme = createTheme();

export default function Blog() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <section id="FAQ">
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="About Us"/>
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
          </section>
        </main>
      </Container>
    </ThemeProvider>
  );
}
