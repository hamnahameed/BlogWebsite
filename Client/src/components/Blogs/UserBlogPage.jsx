// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Card, CardMedia, CardContent, Button, Grid, Box } from '@mui/material';
// import axios from '../../axios';
// import { useNavigate } from 'react-router-dom';
// import '../Blogs/BlogCard.css'
// import { toast } from 'react-toastify';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const UserBlogsPage = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('No token found.');
//           return;
//         }

//         const res = await axios.get('/api/blogs/user-blogs', {
//           headers: {
//             'x-auth-token': token,
//           },
//         });

//         setBlogs(res.data);
//         console.log('Fetched Blogs:', res.data);
//         setError(null);
//       } catch (err) {
//         console.error('Error fetching blogs:', err);
//         setError('Error fetching blogs.');
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const handleDelete = async (id) => {
    
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`/api/blogs/delete/${id}`, {
//         headers: {
//           'x-auth-token': token,
//         },
//       });
//       setBlogs(blogs.filter(blog => blog._id !== id));
//       toast.success('Blog deleted successfully');
//     } catch (err) {
//       console.error(err);
//       toast.error('Error deleting blog');
//     }
//   };

//   const handleReadMore = (id) => {
//     navigate(`/blogsDetail/${id}`);
//   };

//   const handleEdit = (id) => {
//     navigate(`/editBlog/${id}`);
//   };

//   return (
//     <Container component="main" maxWidth="lg">
//       <Typography component="h1" variant="h4" align="center" sx={{ mt: 4, mb: 5, fontWeight: 'bold' }}>
//         Your Blogs
//       </Typography>
//       {error && <Typography color="error">{error}</Typography>}
//       <Grid container spacing={4}>
//         {blogs.length > 0 ? (
//           blogs.map(blog => (
//             <Grid key={blog._id} item xs={12} sm={4} onClick={() => handleReadMore(blog._id)}>
//               <Card style={{ maxWidth: 345, margin: 'auto', marginBottom: 20 }}>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={blog.image}
//                   alt={blog.title}
//                 />
//                 <CardContent>
//                   <Typography gutterBottom variant="h5" component="h2"  className="truncate">
//                     {blog.title}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" component="p" className="truncate">
//                     {blog.content}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" component="p">
//                     Author: {blog.username}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" component="p" className="truncate">
//                    Category: {blog.category}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary" component="p">
//                     Published on: {new Date(blog.date).toDateString()}
//                   </Typography>
//                   <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       // href={`/edit-blog/${blog._id}`}
//                       sx={{ backgroundColor: 'green' }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleEdit(blog._id);
//                       }}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="secondary"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleDelete(blog._id);
//                       }}
//                       sx={{ backgroundColor: 'red' }}
//                     >
//                       Delete
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         ) : (
//           <Typography variant="h6" align="center">No blogs found.</Typography>
//         )}
//       </Grid>
//     </Container>
//   );
// };

// export default UserBlogsPage;


import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardMedia, CardContent, Grid, Box, IconButton } from '@mui/material';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import '../Blogs/BlogCard.css';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UserBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found.');
          return;
        }

        const res = await axios.get('/api/blogs/user-blogs', {
          headers: { 'x-auth-token': token },
        });

        setBlogs(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Error fetching blogs.');
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/blogs/delete/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
      toast.success('Blog deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Error deleting blog');
    }
  };

  const handleReadMore = (id) => navigate(`/blogsDetail/${id}`);
  const handleEdit = (id) => navigate(`/editBlog/${id}`);

  return (
    <Container component="main" maxWidth="lg">
      <Typography 
        component="h1" 
        variant="h4" 
        align="center" 
        sx={{ mt: 4, mb: 5, fontWeight: 'bold', fontFamily:'Arial' }}
      >
        My Blogs
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={4}>
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <Grid key={blog._id} item xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  maxWidth: 340, 
                  margin: 'auto', 
                  marginBottom: 2, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%' // 🔹 ensures equal height
                }}
              >
                <CardMedia 
                  component="img" 
                  height="170" 
                  image={blog.image} 
                  alt={blog.title} 
                />

                <CardContent 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    flexGrow: 1, // 🔹 content stretches
                  }}
                >
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="h3"  
                    sx={{ fontFamily:"Arial" }}
                  >
                    {blog.title}
                  </Typography>

                  {/* Truncate content to 2 lines */}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      mb: 1
                    }}
                  >
                    {blog.content}
                  </Typography>

                  {/* Author + Date row at bottom */}
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 'auto' }}>
                    <Typography variant="body2" color="textSecondary">
                      By {blog.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      • {new Date(blog.date).toDateString()}
                    </Typography>
                  </Box>

                  {/* Icons at bottom right */}
                  <Box 
                    sx={{ 
                      mt: 2, 
                      display: 'flex', 
                      flexDirection: 'row', 
                      gap: 1, 
                      justifyContent:'flex-end' 
                    }}
                  >
                    <IconButton
                      sx={{
                        backgroundColor: 'purple',
                        color: 'white',
                        '&:hover': { backgroundColor: 'darkviolet' },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(blog._id);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      sx={{
                        backgroundColor: 'red',
                        color: 'white',
                        '&:hover': { backgroundColor: 'darkred' },
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(blog._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center">No blogs found.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default UserBlogsPage;

