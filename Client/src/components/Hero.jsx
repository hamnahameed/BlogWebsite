
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import heroImage from '../assets/hero2.jpg'; 
import { useNavigate } from 'react-router-dom';

const Hero = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleCreateBlogClick = () => {
    if (isAuthenticated) {
      navigate('/createBlog');
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      sx={{
        height: { xs: '100vh', md: '90vh' },
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        color: '#fff',
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Box sx={{ maxWidth: { xs: '100%', md: '50%' }, px: { xs: 2, sm: 3 } }}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              fontFamily="Arial"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                fontWeight: 'bold',
              }}
            >
              Welcome to Our Blog Website
            </Typography>

            <Typography
              variant="h6"
              paragraph
              sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.25rem' } }}
            >
              Discover amazing content, stories, and ideas shared by our community.
            </Typography>

            <Typography
              variant="h6"
              paragraph
              sx={{ fontSize: { xs: '1rem', sm: '1.2rem', md: '1.25rem' } }}
            >
              Become a part of our vibrant community. Start blogging today!
            </Typography>

            <Button
              variant="contained"
              onClick={handleCreateBlogClick}
              sx={{
                mt: 2,
                backgroundColor: 'purple',
                color: '#fff',
                fontWeight: 'bold',
                px: { xs: 3, sm: 4 },
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                "&:hover": {
                  backgroundColor: '#6a1b9a',
                },
              }}
            >
              Create Blog
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;

