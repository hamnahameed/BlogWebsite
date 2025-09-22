import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import axios from "../axios"; // your axios instance

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/blogs/all_blogs");
        // Pick first 4 blogs (you can change to sort by date or popularity later)
        setBlogs(response.data.slice(6, 10).reverse(


          
        ));
      } catch (err) {
        console.error("Error fetching featured blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h6">Loading Featured Blogs...</Typography>
      </Box>
    );
  }

  if (!blogs.length) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          No featured blogs available
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, background: "white" ,px:3}}>
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 5 }}
      >
        🔥 Trending Blogs
      </Typography>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog._id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={blog.image}
                alt={blog.title}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    mb: 2,
                  }}
                >
                  {blog.content}
                </Typography>
                <Typography
                  sx={{
                    fontFamily:'Arial',
                    textTransform: "capitalize"
                  }}
                  size="small"
                  variant="contained"
                  color="secondary"
                  fontWeight='bold'
                  cursor='pointer'
                  onClick={() => navigate(`/blogsDetail/${blog._id}`)}
                >
                  Read More →
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default FeaturedBlogs;
