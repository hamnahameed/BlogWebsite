// // import React from 'react';
// // import { Box, Container, Button } from '@mui/material';

// // const Categories = ({ categories, onCategoryClick }) => {
// //   return (
// //     <Box sx={{ py: 4 }}>
// //       <Container maxWidth="lg">
// //         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
// //           {categories.map((category, index) => (
// //             <Button
// //               key={index}
// //               variant="contained"
// //               color="secondary"
// //               sx={{ textTransform: 'none' }}
// //               onClick={() => onCategoryClick(category)}
// //             >
// //               {category}
// //             </Button>
// //           ))}
// //         </Box>
// //       </Container>
// //     </Box>
// //   );
// // };

// // export default Categories;


// import React from 'react';
// import { Box, Container, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

// const Categories = ({ categories, onCategoryClick }) => {
//   return (
    
//     <Box sx={{ py: 4 }}>
//       <Container maxWidth="lg">
//       <Typography 
//         variant="h4" 
//         align="left" 
//         sx={{ fontWeight: "bold", marginBottom: 2 }}
//       >
//         Explore by Categories
//       </Typography>

//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, mb: 4 }}>
//           {categories.map((category, index) => (
//             <Card
//               key={index}
//               sx={{
//                 width: 250,
//                 borderRadius: 3,
//                 boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//                 transition: "transform 0.3s",
//                 "&:hover": {
//                   transform: "translateY(-5px)",
//                   boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
//                 },
//               }}
//             >
//               <CardActionArea onClick={() => onCategoryClick(category)}>
//                 <CardMedia
//                   component="img"
//                   height="120"
//                   image={category.image} // demo placeholder images
//                   alt={category}
//                 />
//                 <CardContent sx={{ textAlign: "center" }}>
//                   <Typography
//                     variant="subtitle1"
//                     sx={{ fontWeight: "bold", textTransform: "capitalize" }}
//                   >
//                     {category.name}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           ))}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Categories;



import React from 'react';
import { Box, Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const Categories = ({ categories, onCategoryClick }) => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Explore by Categories
        </Typography>

        <Grid container spacing={4}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CardActionArea onClick={() => onCategoryClick(category.name)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={category.image}
                    alt={category.name}
                  />
                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", textTransform: "capitalize" }}
                    >
                      {category.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Categories;
