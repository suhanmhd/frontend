import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'

import TeacherBannerImage from "../../assets/images/teacher.jpg";

const TeacherBanner = () => {
    return (
      <Box
        sx={{
          mt: { lg: "80px", xs: "30px" },
          ml: { sm: "50px" },
        }}
      //   position="relative"
        p="20px"
        display="flex"
        justifyContent="space-around"
      >
          <Box>
        <Typography color="green" fontWeight="600" fontSize="70px">
        Teach Your <br /> Children With <br /> Industry Experts
        </Typography>
        <Typography fontWeight={700} mb={2}
        sx={{ fontSize: { lg: '18px', xs: '20px'}}}>
            Help your children to learn from the teachers who <br /> expertise in their corresponding subjects.
        </Typography>
        <Typography fontSize="22px" lineHeight="35px" mb={2}>
          Check out the industry experts
        </Typography>
        <Button variant="contained" color="success">Find your Teacher</Button>
        <Button variant="outlined" color="error" style={{ marginLeft: '35px'}}>Join Us</Button>
        {/* <Typography fontWeight={600}
        color="#ff2625"
        sx={{
            opacity: 0.1,
            display: { lg: 'block', xs: 'none'}
          }} fontSize="200px">Doctor</Typography> */}
          </Box>
        <Box>
        <img src={TeacherBannerImage} alt='banner' className="teacher-banner-img" width={350} height={500} />
        </Box>
      </Box>
    );
  };

export default TeacherBanner