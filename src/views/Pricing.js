import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Speedometer from './Speedometer';
import { useLocation } from 'react-router-dom';
  
  
  
    const defaultTheme = createTheme();
  
  export default function Pricing() {
    const location = useLocation();
    const { faceData } = location.state || {};
    const { claspData } = location.state || {};
    const { modelPrice } = location.state || {};

    

    const tiers = [
      {
        title: 'Face',
        price: '0',
        description: [
          '...',
          '- ...'
        ],
      },
      {
        title: 'Final Valuation',
        price: `${modelPrice - faceData.result[2] - (claspData.result[4] + claspData.result[5])}`,
        description: [
          'Market price: ..',
          'Defects: ...',
          'Final Valuation: ...',
        ],
      },
      {
        title: 'Clasp',
        price: `${claspData.result[4] + claspData.result[5]}`,
        description: [
          'After inspecting your watch clasp, we have detected:',
          '- ...'
        ],
      },
    ];

    
    const updatedTiers = tiers.map(tier => {
      if (tier.title === 'Face' && faceData) {
        return {
          title: 'Face',
          price: `${faceData.result[2]}`,
          description: [
            'After inspecting your watch face, we have detected:',
            ` - ${faceData.result[0] || '- Cracked glass'}`
          ]
        };
      }

      if (tier.title === 'Final Valuation' && modelPrice) {
        return {
          ...tier,
          description: [
            'Market Price: £' + `${modelPrice}`,
            'Defects: £' + `${faceData.result[2] + claspData.result[4] + claspData.result[5]}`,
            'Final Valuation: £' + `${modelPrice - faceData.result[2] - (claspData.result[4] + claspData.result[5])}`
          ]
        };
      }

      if (tier.title === 'Clasp' && claspData) {
        return {
          ...tier,
          description: [
            'After inspecting your watch Clasp, we have detected:',
            ` - ${claspData.result[0]}`,
            ` - ${claspData.result[1]}`
          ]
        };
      }
      return tier;
    });

    return (
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6, paddingLeft: 10, paddingRight: 2 }}>
  
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
  
          >
            Final Valuation
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" component="p" sx={{ marginBottom: 4 }}>
            To give you an accurate valuation of your timepiece, we use AI to detect any cracks, scratches, marks and scuffs.
          </Typography>
  
          <Speedometer value={100 - faceData.result[1] - claspData.result[2] - claspData.result[3]} maxValue={100} />
  
          
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {updatedTiers.map((tier) => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === 'Enterprise' ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      
                      <Typography component="h2" variant="h3" color="text.primary">
                        £{tier.price}
                      </Typography>
                      {tier.title === 'Final Valuation' && (
                        <Typography variant="h6" color="text.secondary">
                          /{modelPrice}
                        </Typography>)}
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant={tier.buttonVariant}>
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        </div>
      </ThemeProvider>
    );
  }
  