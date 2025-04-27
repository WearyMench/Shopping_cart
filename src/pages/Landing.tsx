import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  Grid,
  Paper,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  color: '#fff',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(8),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  maxWidth: '600px',
  margin: '0 auto',
  textAlign: 'center',
  padding: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    margin: 0,
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Landing = () => {
  const theme = useTheme();

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <HeroContent>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                  Welcome to Our Store
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 4 }}>
                  Discover amazing products at great prices
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Button
                    component={RouterLink}
                    to="/products"
                    variant="contained"
                    size="large"
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      backgroundColor: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    Shop Now
                  </Button>
                  <Button
                    component={RouterLink}
                    to="/signup"
                    variant="outlined"
                    size="large"
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      borderColor: '#fff',
                      color: '#fff',
                      '&:hover': {
                        borderColor: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </HeroContent>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                Wide Selection
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Browse through our extensive collection of high-quality products
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                Secure Shopping
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Shop with confidence using our secure payment system
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard elevation={3}>
              <Typography variant="h5" component="h3" gutterBottom>
                Fast Delivery
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Get your orders delivered quickly and safely
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Landing; 