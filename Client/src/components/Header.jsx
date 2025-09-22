// import React from 'react';
// import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton } from '@mui/material';
// import logo from '../assets/logo.PNG'; // Replace with your logo path
// import { Link, useNavigate } from 'react-router-dom';
// import AddIcon from '@mui/icons-material/Add';

// const Header = ({ isAuthenticated, onLogout }) => {

//   const navigate=useNavigate()

//   return (
//     <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', color: 'secondary.main' }}>
//       <Container maxWidth="lg">
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           {/* Subscribe text on the left */}
//           {/* <Typography variant="h6" component="div">
//             Subscribe
//           </Typography> */}
          

//           {/* Logo in the center */}
//           <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'left' }}>
//             <img src={logo} alt="Logo" style={{ width: 100 }} onClick={(()=>navigate('/'))} /> {/* Adjust height as needed */}
//           </Box>

//           {/* Sign Up button on the right */}
//           {isAuthenticated ? (
//             <>
//             <Button variant="contained" component={Link} to="/createBlog" sx={{
//                backgroundImage: 'linear-gradient(140deg, #9c27b0, #ba68c8)', 
//               color: '#fff',
//               borderRadius:'20px', 
//               fontFamily:'Arial', 
//               textTransform:'none', '&:hover': {
//                   backgroundColor: '#AA96DA', // Slightly visible background on hover
//                 }, 
//               }}> Create Blog  </Button>
             
//               <Button color="inherit" onClick={onLogout} component={Link} to="/login"  variant="contained" 
//               sx={{
//                backgroundImage: 'linear-gradient(140deg, #9c27b0, #ba68c8)', 
//                 color: '#fff',
//                 borderRadius:'20px', 
//                 fontFamily:'Arial', 
//                 textTransform:'none',  
//                 '&:hover': {
//                   backgroundColor: '#AA96DA', // Slightly visible background on hover
//                 },  marginLeft:2,
//               }}>
//                 Logout
//               </Button>
//               <Button color="inherit"  component={Link} to="/userblogs"  variant="contained" 
//               sx={{
//                 backgroundImage: 'linear-gradient(140deg, #9c27b0, #ba68c8)', 
//                 color: '#fff',
//                 borderRadius:'20px', 
//                 fontFamily:'Arial', 
//                 textTransform:'none',  
//                 '&:hover': {
//                   backgroundColor: '#AA96DA', // Slightly visible background on hover
//                 },  marginLeft:2,
//               }}>
//                 My blogs
//               </Button>

//             </>


//           ) : (
//             <>
//             <Button color="inherit" component={Link} to="/signup" variant="contained" 
//             sx={{
//               backgroundImage: 'linear-gradient(140deg, #9c27b0, #ba68c8)', 
//               color: '#fff',
//               borderRadius:'20px', 
//               fontFamily:'Arial', 
//               textTransform:'none', 
//               '&:hover': {
//                 backgroundColor: '#AA96DA',  // Slightly visible background on hover
//               },
//             }}>
//               Signup
//             </Button>

//             <Button color="inherit" component={Link} to="/login" variant="contained" 
//             sx={{
//               backgroundImage: 'linear-gradient(140deg, #9c27b0, #ba68c8)', 
//               color: '#fff',
//               borderRadius:'20px',
//               fontFamily:'Arial', 
//               textTransform:'none', 
//               '&:hover': {
//                 backgroundColor: '#AA96DA',  // Slightly visible background on hover
//               },
//               marginLeft:2,
//             }}>
//               Login
//             </Button>
//             </>
           
//           )}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Header;


import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Container, Box, IconButton, Menu, MenuItem, Typography, Avatar } from '@mui/material';
import logo from '../assets/logo.PNG';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = ({ isAuthenticated, onLogout }) => {

  const username = localStorage.getItem('username');
  console.log("local storaage username",username)
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUserMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleUserMenuClose = () => setAnchorEl(null);

  const ButtonStyles = {
    backgroundImage: 'linear-gradient(140deg, #9c27b0, #ba68c8)',
    color: '#fff',
    borderRadius: '20px',
    fontFamily: 'Arial',
    textTransform: 'none',
    '&:hover': { backgroundColor: '#AA96DA' },
    marginLeft: 1,
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: '0px 4px 6px rgba(0,0,0,0.5)' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src={logo} alt="Logo" style={{ width: 100 }} />
          </Box>

          {/* Desktop Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {isAuthenticated ? (
              <>
                <Button component={Link} to="/createBlog" sx={ButtonStyles}> Create Blog</Button>
                <Button component={Link} to="/userblogs" sx={ButtonStyles}>My Blogs</Button>
                <IconButton
                  onClick={handleUserMenuOpen}
                  sx={{ ml: 1, color: 'white',   backgroundImage: 'linear-gradient(140deg, #9c27b0, #ba68c8)', '&:hover': { backgroundColor: 'darkviolet' } }}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleUserMenuClose}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem disabled>Hi, {username}</MenuItem>
                  <MenuItem component={Link} to="/createBlog" onClick={handleUserMenuClose}>Create Blog</MenuItem>
                  <MenuItem component={Link} to="/userblogs" onClick={handleUserMenuClose}>My Blogs</MenuItem>
                  <MenuItem onClick={() => { handleUserMenuClose(); onLogout(); }} component={Link} to="/login">Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button component={Link} to="/signup" sx={ButtonStyles}>Signup</Button>
                <Button component={Link} to="/login" sx={ButtonStyles}>Login</Button>
              </>
            )}
          </Box>

          {/* Mobile User Icon */}
          {isAuthenticated && (
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                onClick={handleUserMenuOpen}
                sx={{ color: 'white',   backgroundImage: 'linear-gradient(140deg, #9c27b0, #ba68c8)','&:hover': { backgroundColor: 'darkviolet' } }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ sx: { width: 200 } }}
              >
                <MenuItem disabled>Hi, {username}</MenuItem>
                <MenuItem component={Link} to="/createBlog" onClick={handleUserMenuClose}>Create Blog</MenuItem>
                <MenuItem component={Link} to="/userblogs" onClick={handleUserMenuClose}>My Blogs</MenuItem>
                <MenuItem onClick={() => { handleUserMenuClose(); onLogout(); }} component={Link} to="/login">Logout</MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

