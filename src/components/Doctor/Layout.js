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
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  const DoctorSidebarData = [
    {
      name: "Home",
      path: "/doctorHome",
      icon: "fa-sharp fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/appointment-requests",
      icon: "fa-solid fa-list",
    },
    {
      name: "Messages",
      path: `/message-requests`,
      icon: "fa-solid fa-message",
    },
    {
      name: "Profile",
      path: `/doctorProfile/${doctor?.doctorExists?.id}`,
      icon: "fa-solid fa-user",
    },
    {
      name: "New Patient",
      path: `/ne/${doctor?.doctorExists?.id}`,
      icon: "fa-solid fa-user",
    },
  ];

  return (
    <>
      <div className=" bg-gray-50">
        <div className="w-full">
          <div className="flex justify-between py-3 px-4 bg-white">
            <div>
              <i class="fa-solid fa-bars text-2xl"></i>
            </div>
            <div className="">
              <i class="fa-solid fa-bell text-2xl"></i>
              <Link to="#" className="text-slate-700 ms-3">
                Dr.Muhammad Suhan
                {doctor?.doctorExists?.name} {doctor?.doctorExists?.lastname}
              </Link>
            </div>
          </div>

          {/* sideBar  */}
          <div className="sm:hidden bg-white absolute opacity-0 top-15 left-0 z-10 w-full h-full  text-slate-700 py-3">
              <div className="">
                {DoctorSidebarData.map((menu) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <>
                      <div className={`menu-item1 ${isActive && "active1"}  text-slate-700  py-3 mt-3 ` } >
                        <i className={menu.icon}></i>
                        <Link
                        className="text-slate-700 uppercase "
                        to={menu.path}>{menu.name}</Link>
                      </div>
                    </>
                  );
                })}
                <div className={`menu-item1`} onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <Link to="/doctorLogin">Logout</Link>
                </div>
              </div>
            </div>
            {/* flex flex-col gap-3 overflow-y-auto h-screen hide-scrollbar sm:flex-row */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 px-4 py-5">
            <div className="hidden sm:block sm:col-start-1 sm:col-end-2 h-full py-3 
             bg-white border-solid border-2 border-gray-100 rounded-md">
              <div className="">
              <div className=" text-center py-4">
                  <p className="text-lg font-extrabold">Muhammad Suhan</p>
                  <p className="text-xs text-slate-500">BDS,MDS - Oral & Maxillofacial Surgery</p>
                </div>
                {DoctorSidebarData.map((menu) => {
                  const isActive = location.pathname === menu.path;
                  return (
                    <>
                      <div className={`menu-item1 ${isActive && "active1"}
                      border-solid border-t border-gray-200 py-3
                      `}>
                        <i className={menu.icon}></i>
                        <Link  
                        
                        to={menu.path}>{menu.name}</Link>
                      </div>
                    </>
                  );
                })}
                <div className={`menu-item1  border-solid border-t border-gray-200 py-3`} onClick={handleLogout}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <Link to="/doctorLogin">Logout</Link>
                </div>
              </div>
            </div>
            <div className="sm:col-start-2 sm:col-end-5 py-3 px-2
             bg-white border-solid border-2 border-gray-100 rounded-md
            ">{children}</div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Layout;
