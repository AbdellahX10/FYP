import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import twsLogo from './twsLogo.png';
import { Link } from "react-router-dom";
import {useContext} from 'react'
import jwt_decode from "jwt-decode"
import AuthContext from '../context/AuthContext'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { useHistory } from 'react-router-dom';


const sections = [
    { title: 'Home', url: '/' },
    { title: 'Price Predictions', url: '/PricePrediction' },
    { title: 'Give me a valuation', url: '/Valuation' },
  ];

  const sections2 = [
    { title: 'Home', url: '/' },
    { title: 'Login', url: '/login' },
    { title: 'Register', url: '/register' },
  ];

const title = "The Watch Specialists";

function Header() {

    const defaultTheme = createTheme();
    
    const {logoutUser} = useContext(AuthContext)
    const token = localStorage.getItem("authTokens")
    

    if (token){
        const decoded = jwt_decode(token)
        var username = decoded.username
    }

    const history = useHistory();

    const navigateAndScroll = () => {
        history.push('/'); 
        setTimeout(() => {
        const section = document.getElementById('FAQ');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        }, 0);
    };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Container maxWidth="lg">
        <React.Fragment>
          <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <img src={twsLogo} alt="" width={140} height={100} />
            <Typography
              component="h2"
              variant="h5"
              color="inherit"
              align="center"
              noWrap
              sx={{ flex: 1 }}
            >
              {title}
            </Typography>
            {token !== null && 
            <Button onClick={logoutUser} variant="outlined" size="small">
              Logout
            </Button>
            }
          </Toolbar>
          <Toolbar
            component="nav"
            variant="dense"
            sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
          >

            {token !== null && 
                sections.map((section) => (
                <Link
                    to={section.url}
                    style={{ textDecoration: 'none', color: 'inherit', whiteSpace: 'nowrap' }}
                    color="inherit"
                    key={section.title}
                    variant="body2"
                    sx={{ p: 1, flexShrink: 0 }}
                >
                    {section.title}
                </Link>

                )
                )
                
            }

            {token !== null &&
                <Link
                    style={{ textDecoration: 'none', color: 'inherit', whiteSpace: 'nowrap' }}
                    color="inherit"
                    variant="body2"
                    sx={{ p: 1, flexShrink: 0 }}
                    to='/WatchList'
                    >
                        {username}'s WatchList
                    </Link>
                }

            {token === null && 
                sections2.map((section) => (
                <Link
                    to={section.url}
                    style={{ textDecoration: 'none', color: 'inherit', whiteSpace: 'nowrap' }}
                    color="inherit"
                    key={section.title}
                    variant="body2"
                    sx={{ p: 1, flexShrink: 0 }}
                >
                    {section.title}
                </Link>
                ))
            }
            <Button onClick={navigateAndScroll} sx={{
                  '&:focus': {
                    outline: 'none',
                  },
                }}
        >About</Button>
          </Toolbar>
        </React.Fragment>
      </Container>
    </ThemeProvider>
  );
}

export default Header