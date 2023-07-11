import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Admin/Sidebar";
import styled from "styled-components";
import MainDash from "../../components/Admin/MainDash/MainDash";
import { useNavigate } from "react-router-dom";
import UserInfo from "../../components/Admin/AdminUserInfo/UserInfo";
import DoctorInfo from "../../components/Admin/AdminDoctorInfo/DoctorInfo";
import AdminApprovals from "../../components/Admin/AdminApprovals/AdminApprovals";
import Categories from "../../components/Admin/CategoryManagement/Categories";
import AllAppoinments from "../../components/Admin/AdminAllAppointments/AllAppoinments";
import AdminSignup from "./AdminSignup";

const AdminHome = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");

  useEffect(() => {
    const token = localStorage.getItem("admin");
    if (!token) {
      navigate("/adminLogin");
    } else {
      navigate("/adminHome");
    }
  }, [navigate]);

  const App = styled.div`
    background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: "Inter", sans-serif;
  `;

  const AppGlass = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    ${"" /* border-radius: 2rem; */}
    ${"" /* gap: 16px; */}
  grid-template-columns: 11rem auto 2rem;
    overflow: hidden;

    @media screen and (max-width: 1200px) {
      grid-template-columns: 10% 50% auto;
      overflow-y: scroll;
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `;

  return (
    <>
      <App>
        <AppGlass>
          <Sidebar setPage={setPage} />
          {page === "dashboard" && <MainDash />}
          {page === "categories" && <Categories />}
          {page === "approvals" && <AdminApprovals />}
          {page === "appointments" && <AllAppoinments />}
          {page === "users" && <UserInfo />}
          {page === "doctors" && <DoctorInfo />}
          {page === "newAdmin" && <AdminSignup />}
        </AppGlass>
      </App>
    </>
  );
};

export default AdminHome;
