import React, { useState } from "react";
import Logo from "../../assets/admin/imgs/logo.png";
import "./Sidebar.css";
import { SidebarData } from "../../Data/Data";
import { UilSignOutAlt, UilUsersAlt } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/features/adminSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = ({setPage}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const handleLogout = () => {
    dispatch(setLogout());
    navigate('/adminLogin')
  };

  const [selected, setSelected] = useState(0);

  return (
    <div className="Sidebar">
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="" srcset="" />
        <span>
          Click<span> N </span>Visit
        </span>
      </div>

      {/* menu */}
      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => {
                setPage(item.page)
                setSelected(index)
              }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}

        <div className="menuItem" onClick={handleLogout}>
          <UilSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
