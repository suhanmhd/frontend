import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
// import { DoctorSidebarData } from "../../Data/Data";
import { setLogout } from "../../redux/features/doctorSlice";
import "./Layout.css";

const Layout = ({ children }) => {

  const location = useLocation();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
  };

//   const { doctor } = useSelector((state) => ({ ...state.doctor }));
  const doctor = JSON.parse(localStorage.getItem('doctor'))

  const DoctorSidebarData = [
    {
      name: 'Home',
      path: '/doctorHome',
      icon: 'fa-sharp fa-solid fa-house'
    },
    {
      name: 'Appointments',
      path: '/appointment-requests',
      icon: 'fa-solid fa-list'
    },
    {
      name: 'Messages',
      path: `/message-requests`,
      icon: 'fa-solid fa-message'
    },
    {
      name: 'Profile',
      path: `/doctorProfile/${doctor?.doctorExists?.id}`,
      icon: 'fa-solid fa-user'
    },
    {
      name: 'New Patient',
      path: `/ne/${doctor?.doctorExists?.id}`,
      icon: 'fa-solid fa-user'
    }
  ]

  return (
    <>
      <div className="main1">
        <div className="layout1">
          <div className="sidebar1">
            <div className="logo1">
              <h6>CLICK N VISIT</h6>
              <hr />
            </div>
            <div className="menu1">
              {DoctorSidebarData.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item1 ${isActive && "active1"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
            </div>

            <div className={`menu-item1`} onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/doctorLogin">Logout</Link>
            </div>
          </div>
          <div className="content1">
            <div className="header1">
              <div className="header-content1">
                <i class="fa-solid fa-bell"></i>
                <Link to="#">Dr. 
                  {doctor?.doctorExists?.name}{" "}
                  {/* {doctor?.doctorExists?.lastname} */}
                </Link>
              </div>
            </div>
            <div className="body1">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
