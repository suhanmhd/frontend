import React, { useState } from 'react'
import { Box } from '@mui/material' 

import DoctorBanner from '../../components/Home/DoctorBanner'
import LawyerBanner from '../../components/Home/LawyerBanner'
import TeacherBanner from '../../components/Home/TeacherBanner'
import FitnessTrainerBanner from '../../components/Home/FitnessTrainerBanner'
import Navbar from '../../components/Navbar'

const Home = () => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  
  return (
    <Box>
        <Navbar />
        <DoctorBanner />
        {/* <LawyerBanner />
        <TeacherBanner />
        <FitnessTrainerBanner /> */}
    </Box>
  )
}

export default Home