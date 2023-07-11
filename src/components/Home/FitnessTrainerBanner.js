import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material'

import FitnessTrainerBannerImage from "../../assets/images/fitnesstrainer.jpg";

const FitnessTrainerBanner = () => {
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
        className="fitness"
      >
        <Stack flexDirection="row" alignItems="center">
        <img src={FitnessTrainerBannerImage} alt='banner' className="fitnesstrainer-banner-img" width={550} height={300} />
        </Stack>
        <Box>
        <Typography color="green" fontWeight="600" fontSize="70px">
        Get a personal <br /> Fitness Trainer
        </Typography>
        <Typography fontWeight={700} mb={2}
        sx={{ fontSize: { lg: '18px', xs: '20px'}}}>
         Be in shape by following the tips and guidelines <br />  provided by the experienced fitness trainers <br /> along with their magic diet.
        </Typography>
        <Typography fontSize="22px" lineHeight="35px" mb={2}>
          Check out the industry experts
        </Typography>
        <Button variant="contained" color="success">Find your Fitness Trainer</Button>
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

export default FitnessTrainerBanner