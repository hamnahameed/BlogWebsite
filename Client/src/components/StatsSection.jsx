import React from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { BarChart, Users, Bookmark, Star } from "lucide-react"; 
import statsBg from "../assets/statsbg2.jpg"; // ✅ import properly

const stats = [
  { id: 1, icon: <BarChart size={40} />, number: "500+", label: "Blogs Published" },
  { id: 2, icon: <Users size={40} />, number: "200+", label: "Active Readers" },
  { id: 3, icon: <Bookmark size={40} />, number: "50+", label: "Categories Covered" },
  { id: 4, icon: <Star size={40} />, number: "120+", label: "5-Star Reviews" },
];

const StatsSection = () => {
  return (
    <Box
      sx={{
        py: 8,
        backgroundImage: `url(${statsBg})`, // ✅ imported image
        backgroundSize: "cover",           // image cover
        backgroundPosition: "center",      // center align
        backgroundRepeat: "no-repeat",     // prevent tiling
        position: "relative",
        zIndex: 1,
        "&::before": {                     // ✅ add overlay
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        // background: "rgba(170,150,218,0.6)", // overlay color
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: "bold", mb: 6, color: "#fff" }}
        >
          Our Achievements 🚀
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Paper
                  elevation={6}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(10px)",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "scale(1.05) rotate(-1deg)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <Box sx={{ color: "secondary.main", mb: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#333" }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ mt: 1 }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default StatsSection;
