import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import Blogs from "../components/Blogs/Blogs";

const CategoryBlogsPage = () => {
  const { categoryName } = useParams(); // URL se category name milega
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs/all_blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <Blogs blogs={blogs} selectedCategory={categoryName} />
    </div>
  );
};

export default CategoryBlogsPage;
