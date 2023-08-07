import React, { useEffect } from 'react'
import { Route, Routes} from 'react-router-dom'
import { Box } from '@mui/material'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

// import Doctor from './pages/Doctor'
import Home from './pages/user/Home'
import Footer from './components/Footer'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import AdminHome from './pages/admin/AdminHome';
import AdminLogin from './pages/admin/AdminLogin';
import UserPrivateRoutes from './utils/UserPrivateRoutes';
import './App.css'


import { useDispatch } from 'react-redux';
import { setUser } from './redux/features/authSlice';
import AdminSignup from './pages/admin/AdminSignup';
import DoctorSignup from './pages/doctor/DoctorSignup';
import DoctorLogin from './pages/doctor/DoctorLogin';
import DoctorHome from './pages/doctor/DoctorHome';
import FindDoctor from './pages/doctor/FindDoctor';
import InCategoryDoctorsList from './pages/doctor/InCategoryDoctorsList';
import DoctorProfile from './pages/doctor/DoctorProfile';
import DoctorBooking from './pages/doctor/DoctorBooking';
import AppointmentRequests from './pages/doctor/AppointmentRequests';
import ViewAppointments from './pages/user/ViewAppointments';
import PaymentPage from './pages/user/PaymentPage';
import Messenger from './pages/messenger/Messenger';
import Wallet from './pages/user/Wallet';
import PaymentSuccessPage from './pages/user/PaymentSuccessPage';
import UserProfile from './pages/user/UserProfile';
import MessageRequestsPage from './pages/doctor/MessageRequestsPage';
import DoctorPrivateRoutes from './utils/DoctorPrivateRoutes';
import AdminPrivateRoutes from './utils/AdminPrivateRoutes';
import EnterOTP from './pages/user/EnterOTP';
import ResendOTP from './pages/user/ResendOTP';
import ForgotPassword from './pages/user/ForgotPassword';
import SetNewPassword from './pages/user/SetNewPassword';
import E404 from './pages/E404/E404';
import SheduleTimings from './pages/doctor/SheduleTimings';
import BookAppointments from './pages/user/BookAppointments';

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    dispatch(setUser(user))
  })
  
  return (
    <Box width = "400px" sx={{ width: {xl: '1488px' }}} m="auto">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/doctorSignup" element={<DoctorSignup />} />
        <Route path="/doctorLogin" element={<DoctorLogin />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/adminSignup" element={<AdminSignup />} />
        <Route path="/findDoctor" element={<FindDoctor />} />
        <Route path="/view-doctors/:departmentName" element={<InCategoryDoctorsList />} />
        <Route path="/single-doctor/:docId" element={<DoctorBooking />} />
        <Route path="/book-slot/:docId" element={<BookAppointments />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/doctorProfile/:docId" element={<DoctorProfile />} />
        <Route path="/schedule-timings" element={<SheduleTimings />} />
        <Route path="/emailVerification/:id" element={<EnterOTP />} />
        <Route path="/resendOtp" element={<ResendOTP />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/newPassword/:userId/:token" element={<SetNewPassword />} />
        <Route path="*" element={<E404 />} />

        <Route element={<AdminPrivateRoutes />}>
            <Route path="/adminHome" element={<AdminHome />}/>
        </Route>

        <Route element={<UserPrivateRoutes />}>
        <Route path="/view-appointments" element={<ViewAppointments />} />
        <Route path="/payment-page/:id" element={<PaymentPage />} />
        <Route path="/paymentSuccess" element={<PaymentSuccessPage />} />
        <Route path="/messenger" element={<Messenger />} />
        <Route path="/my-wallet" element={<Wallet />} />
        </Route>

        <Route
         element={<DoctorPrivateRoutes/>}
         >
        <Route path="/doctorHome" element={<DoctorHome />} />
        <Route path="/appointment-requests" element={<AppointmentRequests />} />
        <Route path="/message-requests" element={<MessageRequestsPage />} />
        </Route>
      </Routes>
      <Footer />
    </Box>
  )
}

export default App
