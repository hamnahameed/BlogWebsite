// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, Box, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
// import axios from '../../axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';


// const CreateBlog = () => {
//   const [blogData, setBlogData] = useState({
//     title: '',
//     content: '',
//     image: null,
//     imagePreview: '',
//     category: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBlogData({ ...blogData, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBlogData({ ...blogData, image: file, imagePreview: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('title', blogData.title);
//     formData.append('content', blogData.content);
//     formData.append('category', blogData.category);
//     formData.append('image', blogData.image);


//     try {
//       const token = localStorage.getItem('token');
//       console.log(token)
//       const res = await axios.post('/api/blogs/create_blogs', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'x-auth-token': token,
//         }
//       });
//       console.log("blog created data", res.data);
//       console.log("blog username", res.data.username);
//       toast.success('Blog created successfully');
//       navigate('/userBlogs'); 
//     } catch (error) {
//       console.error(error);
//       toast.error('Error creating blog');
//       console.error('Error details:', {
//         message: error.message,
//         name: error.name,
//         code: error.code,
//         config: error.config,
//         request: error.request,
//         response: error.response
//       });

//     }
//   };


//   return (
//     <Container component="main" maxWidth="md">
//       <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
//         <Typography component="h1" variant="h5" align="center">
//           Create Blog
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="title"
//             label="Blog Title"
//             name="title"
//             value={blogData.title}
//             onChange={handleChange}
//             autoFocus

//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="content"
//             label="Content"
//             name="content"
//             value={blogData.content}
//             onChange={handleChange}
//             multiline
//             rows={6}
//           />
//           <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
//             <InputLabel id="category-label">Category</InputLabel>
//             <Select
//               labelId="category-label"
//               id="category"
//               name="category"
//               value={blogData.category}
//               onChange={handleChange}
//               label="Category"
//             >
//               <MenuItem value="Food">Food</MenuItem>
//               <MenuItem value="Health">Health</MenuItem>
//               <MenuItem value="Technology">Technology</MenuItem>
//               <MenuItem value="Travel">Travel</MenuItem>
//               <MenuItem value="Education">Education</MenuItem>
//               <MenuItem value="Entertainment">Entertainment</MenuItem>
//             </Select>
//           </FormControl>
//           <Button
//             variant="contained"
//             component="label"
//             fullWidth
//             sx={{ mt: 2, mb: 2 ,backgroundColor:'secondary.main'}}
//           >
//             Upload Image
//             <input
//               type="file"
//               hidden
//               onChange={handleImageChange}
//             />
//           </Button>
//           {blogData.imagePreview && (
//             <Box sx={{ textAlign: 'center', mt: 2 }}>
//               <img
//                 src={blogData.imagePreview}
//                 alt="Blog Preview"
//                 style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
//               />
//             </Box>
//           )}
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             sx={{ mt: 3, mb: 2,backgroundColor:'secondary.main' }}

//           >
//             Create Blog
//           </Button>


//         </Box>

//       </Paper>
//     </Container>
//   );
// };

// export default CreateBlog;



import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  CircularProgress,
} from "@mui/material";
import imageCompression from "browser-image-compression";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import blogform from "../../assets/blogform2.jpeg";

const CreateBlog = () => {
  const [loading,setloading]=useState(false)
  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    image: null,
    imagePreview: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      // Compression options
      const options = {
        maxSizeMB: 2,          // Target max size in MB (2 MB here)
        maxWidthOrHeight: 1200, // Resize image if too large
        useWebWorker: true,
      };

      // Compress the file
      const compressedFile = await imageCompression(file, options);

      // Preview (convert compressed file to base64)
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogData({
          ...blogData,
          image: compressedFile,   // store compressed file instead of original
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Error compressing image:", error);
    }
  }
};

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ validation: check empty fields
  if (
    !blogData.title.trim() ||
    !blogData.content.trim() ||
    !blogData.category.trim() ||
    !blogData.image
  ) {
    toast.error("All fields are required!");
    return; // stop further execution
  }
  
    setloading(true);

    const formData = new FormData();
    formData.append('title', blogData.title);
    formData.append('content', blogData.content);
    formData.append('category', blogData.category);
    formData.append('image', blogData.image);


    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const res = await axios.post('/api/blogs/create_blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token,
        }
      });
      console.log("blog created data", res.data);
      console.log("blog username", res.data.username);
      toast.success('Blog created successfully');
      navigate('/userBlogs'); 
    } catch (error) {
      console.error(error);
      toast.error('Error creating blog');
      console.error('Error details:', {message: error.message,});
    }
     finally{
        setloading(false);
      }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 8 }}>
      <Grid
        container
        spacing={0}
        sx={{
          minHeight: "80vh",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* Left: Form */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: "100%",
              borderRadius: 2,
              background: {
                xs: `linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url(${blogform})`,
                md: "#fff",
              },
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              align="center"
              gutterBottom
              fontWeight="bold"
              
            >
              Create a New Blog
            </Typography>
            <Typography
              component="h1"
              variant="subtitle2"
              align="center"
              gutterBottom
              color="#888"

            >
              Share your thoughts with the world
            </Typography>


            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Blog Title"
                name="title"
                value={blogData.title}
                onChange={handleChange}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="content"
                label="Content"
                name="content"
                value={blogData.content}
                onChange={handleChange}
                multiline
                rows={6}
              />

              <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={blogData.category}
                  onChange={handleChange}
                >
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Health">Health</MenuItem>
                  <MenuItem value="Technology">Technology</MenuItem>
                  <MenuItem value="Travel">Travel</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Entertainment">Entertainment</MenuItem>
                   <MenuItem value="sports">Sports</MenuItem>
                    <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                </Select>
              </FormControl>

              {/* Upload Box */}
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
                >
                  Featured Image
                </Typography>

                <Paper
                  elevation={0}
                  variant="outlined"
                  sx={{
                    width: "87%",
                    border: "2px dashed #bbb",
                    borderRadius: 2,
                    p: 4,
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                    display: "flex",          // 🔹 fix layout
                    flexDirection: "column",  // 🔹 stack icon + text properly
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": { backgroundColor: "#f3f3f3" },
                  }}
                  component="label"
                >
                  <CloudUploadIcon sx={{ fontSize: 50, color: "#888", mb: 1 }} />

                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "#555", mb: 0.5 }}
                  >
                    Click to upload or drag and drop
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    PNG, JPG, or GIF (max. 10MB)
                  </Typography>

                  <input
                    type="file"
                    hidden
                    accept="image/png, image/jpeg, image/gif"
                    onChange={handleImageChange}
                  />
                </Paper>
              </Box>

              {/* Preview */}
              {blogData.imagePreview && (
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <img
                    src={blogData.imagePreview}
                    alt="Blog Preview"
                    style={{
                      width: "100%",
                      maxHeight: "220px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Box>
              )}



              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: 'secondary.main',
                  fontWeight: "bold",
                  py: 1.2,

                 "&:hover" :{ backgroundColor: "#AA96DA"}
                }}
              >

               { loading ? (
                  <CircularProgress size={24} sx={{color:"white"}}></CircularProgress>
                ): (
                   "Publish Blog"
                )}
               
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Right: Image (hidden on small screens) */}
        <Grid
          item
          xs={false}
          md={6}
          sx={{
            backgroundImage: `url(${blogform})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </Container>
  );
};

export default CreateBlog;

