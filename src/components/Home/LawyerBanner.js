import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'

import LawyerBannerImage from "../../assets/images/lawyer.jpg";

const LawyerBanner = () => {
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
        <img src={LawyerBannerImage} alt='banner' className="lawyer-banner-img" width={450} height={500} />
        </Box>
        <Box>
        <Typography color="green" fontWeight="600" fontSize="70px">
        Your Solution <br /> Legal <br /> Consultancy
        </Typography>
        <Typography fontWeight={700} mb={2}
        sx={{ fontSize: { lg: '18px', xs: '20px'}}}>
          We are here to take care of your legality with the <br /> best service especially for you.
        </Typography>
        <Typography fontSize="22px" lineHeight="35px" mb={2}>
          Check out the industry experts
        </Typography>
        <Button variant="contained" color="success" href="">Find your Lawyer</Button>
        <Button variant="outlined" color="error" style={{ marginLeft: '35px'}}>Join Us</Button>
        {/* <Typography fontWeight={600}
        color="#ff2625"
        sx={{
            opacity: 0.1,
            display: { lg: 'block', xs: 'none'}
          }} fontSize="200px">Doctor</Typography> */}
          </Box>
      </Box>
    );
  };

export default LawyerBanner