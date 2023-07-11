import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

import DoctorBannerImage from "../../assets/images/doctor.webp";
import { Link } from "react-router-dom";
const DoctorBanner = () => {
  return (
    <><Box
      sx={{
        mt: { lg: "80px", xs: "30px" },
        ml: { sm: "50px" },
      }}
      //   position="relative"
      p="10px"
      display="flex"
      justifyContent="space-around"
      className="doctor"
    >
      <Box>
        <Typography color="green" fontWeight="600" fontSize="70px">
          Healthcare <br /> When All Else <br /> Fails
        </Typography>
        <Typography fontWeight={700} mb={2}
          sx={{ fontSize: { lg: '18px', xs: '20px' } }}>
          "The art of medicine consists of amusing the patient while nature <br /> cures the disease."<br /> - Voltaire
        </Typography>
        <Typography fontSize="22px" lineHeight="35px" mb={2}>
          Check out the industry experts
        </Typography>
        <Link to="/findDoctor">
          <Button variant="contained" color="success">Find your Doctor</Button>
        </Link>
        <Link to="/doctorSignup">
          <Button variant="outlined" color="error" style={{ marginLeft: '35px' }}>Join Us</Button>
        </Link>
      </Box>
      <Box>
        <img src={DoctorBannerImage} alt='banner' className="doctor-banner-img" width={350} height={500} />
      </Box>
    </Box><Box
      sx={{
        mt: { lg: "20px", xs: "10px" },
        mb: { lg: "20px", sm: "50px" },
        ml: { sm: "50px" },
      }}
      //   position="relative"
      p="20px"
      display="flex"
      justifyContent="space-around"
    >
        <Box>
          <img src="https://st2.depositphotos.com/2224394/7510/i/950/depositphotos_75101721-stock-photo-group-of-doctors-team.jpg" alt='banner' className="lawyer-banner-img" width={1150} height={500} />
        </Box>
      </Box>
      <Box
      sx={{
        mt: { lg: "20px", xs: "30px" },
        ml: { sm: "50px" },
        mb: { lg: "20px", sm: "50px" }
      }}
      //   position="relative"
      p="20px"
      display="flex"
      justifyContent="space-around"
    >
      <Box>
        <Typography
          fontWeight={700}
          mb={2}
          sx={{ fontSize: { lg: "25px", xs: "20px" } }}
        >
          Our website is easy to navigate and allows you to search for doctors
          based on your specific needs. <br /> You can search by specialty. Once
          you've found a doctor that you're interested in,
          <br /> you can easily book an appointment online. We believe that
          everyone deserves access to quality healthcare, <br /> which is why we
          work with a network of trusted healthcare providers to bring you the
          best care possible. <br /> <br />
          Our doctors are highly qualified and experienced in their respective
          fields, and <br /> are committed to providing the highest level of
          care to their patients.
          <br /> <br />
          Thank you for choosing our doctor booking website for your healthcare
          needs. <br />
          We look forward to helping you find the care you deserve.
        </Typography>
        <Link to="/findDoctor">
          <Button variant="contained" color="success">
            Find your Doctor
          </Button>
        </Link>
        <Link to="/doctorSignup">
          <Button
            variant="outlined"
            color="error"
            style={{ marginLeft: "35px" }}
          >
            Join Us
          </Button>
        </Link>
      </Box>
    </Box>
    
    <Box
      sx={{
        // mt: { lg: "10px", xs: "10px" },
        ml: { sm: "50px" },
      }}
      //   position="relative"
      p="20px"
      display="flex"
      justifyContent="space-around"
    >
        <Box>
          <img src="https://thumbs.dreamstime.com/b/double-exposure-smart-medical-doctor-working-abstract-operating-room-as-concept-43622592.jpg" alt='banner' className="lawyer-banner-img" width={1300} height={500} />
        </Box>
      </Box></>
  );
};

// const DoctorBanner = () => {
//   return (
//     <Box
//       sx={{
//         mt: { lg: "80px", xs: "30px" },
//         ml: { sm: "50px" },
//       }}
//     //   position="relative"
//       p="20px"
//       display="flex"
//       justifyContent="space-around"
//       className="doctor"
//     >
//         <Box>
//       <Typography color="green" fontWeight="600" fontSize="70px">
//         Healthcare <br /> When All Else <br /> Fails
//       </Typography>
//       <Typography fontWeight={700} mb={2}
//       sx={{ fontSize: { lg: '18px', xs: '20px'}}}>
//       First-Class, women-centric care for hormone issues & <br /> auto immunity. Get fully-integrative care from a holistic <br /> doctor and nutritionist for $175/month.
//       </Typography>
//       <Typography fontSize="22px" lineHeight="35px" mb={2}>
//         Check out the industry experts
//       </Typography>
//       <Link to="/findDoctor">
//       <Button variant="contained" color="success">Find your Doctor</Button>
//       </Link>
//       <Link to="/doctorSignup">
//       <Button variant="outlined" color="error" style={{ marginLeft: '35px'}}>Join Us</Button>
//       </Link>
//         </Box>
//       <Box>
//           <img src={DoctorBannerImage} alt='banner' className="doctor-banner-img" width={350} height={500} />
//       {/* <Typography fontWeight={600}
//       color="#ff2625"
//       sx={{
//           opacity: 0.1,
//           display: { lg: 'block', xs: 'none'}
//         }} fontSize="100px">Doctor</Typography> */}
//       </Box>
//     </Box>
//   );
// };

export default DoctorBanner;
