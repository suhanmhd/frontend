// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Stack, Typography } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";

// import Logo from "../../../assets/images/Logo.png";
// // import { setLogout } from "../redux/features/authSlice";

// const DoctorNavbar = () => {
//   // const [show, setShow] = useState(false)
//   const dispatch = useDispatch()

//   const handleLogout = () => {
//     // dispatch(setLogout())
//   }
//   const { user } = useSelector((state) => ({...state.auth}))
//   return (
//     <Stack
//       direction="row"
//       justifyContent="space-around"
//       sx={{
//         gap: {
//           sm: "122px",
//           xs: "40px",
//         },
//         mt: { sm: "32px", xs: "20px" },
//         // justifyContent: 'none'
//       }}
//       >
        
//       <Link to="/" style={{
//           textDecoration: "none",
//           color: "#3A1212",
//         }}>
//         <img
//           src={Logo}
//           alt="Logo"
//           style={{
//             width: "120px",
//             height: "80px",
//           }}
//         />
//         <Typography sx={{
//           fontWeight:"bold"
//         }} fontSize="20px">CLICK N VISIT</Typography>
//       </Link>
//       <Stack direction="row" gap="40px" fontSize="24px" alignItems="flex-center" pr="40px">
//         <Link
//           to="/"
//           style={{
//             textDecoration: "none",
//             color: "#3A1212",
//           }}
//         >
//           Home
//         </Link>
//         { user?.userExists?._id ? (
//           <><p>{user?.userExists?.firstname}</p><Link
//             to="/"
//             onClick={handleLogout}
//             style={{
//               textDecoration: "none",
//               color: "#3A1212",
//             }}
//           >
//             Logout
//           </Link></>
//         ) : ( 
//           <><Link
//               to="/login"
//               style={{
//                 textDecoration: "none",
//                 color: "#3A1212",
//               }}
//             >
//               Login
//             </Link><Link
//               to="/signup"
//               style={{
//                 textDecoration: "none",
//                 color: "#3A1212",
//               }}
//             >
//                 Signup
//               </Link></>
//         )}
//       </Stack>
//     </Stack>
//   );
// };

// export default DoctorNavbar;
