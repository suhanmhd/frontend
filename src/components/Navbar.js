import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import Logo from "../assets/images/Logo.png";
import { setLogout } from "../redux/features/authSlice";

function Navbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const user = JSON.parse(localStorage.getItem("user"));

  const userNavigation = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Appointments",
      path: "/view-appointments",
    },
    {
      name: "My Wallet",
      path: `/my-wallet`,
    },
    {
      name: "Messages",
      path: `/messenger`,
    },
  ];

  return (
    <header class="header">
      <nav class="navbar navbar-expand-lg header-nav">
        <div class="navbar-header">
          <a id="mobile_btn" href="javascript:void(0);">
            <span class="bar-icon">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </a>
          <a href="/" class="navbar-brand logo">
            <img
              src="/assets/img/logo.png"
              class="img-fluid w-auto"
              alt="Logo"
            />
          </a>
        </div>

        <div class="main-menu-wrapper">
          <div class="menu-header">
            <a href="/" class="menu-logo">
              <img src="assets/img/logo.png" class="img-fluid" alt="Logo" />
            </a>
            <a id="menu_close" class="menu-close" href="javascript:void(0);">
              <i class="fas fa-times"></i>
            </a>
          </div>

          <ul class="main-nav">
            {user?.userExists ? (
              userNavigation.map((nav) => (
                <li>
                  <a href={nav.path}>{nav.name}</a>
                </li>
              ))
            ) : (
              <>
                <li>
                  <a href="/">Home</a>
                </li>
              </>
            )}
          </ul>
        </div>

        <ul class="nav header-navbar-rht">
          {user?.userExists ? (
            <li class="nav-item dropdown has-arrow logged-item">
              <a
                href="#"
                class="dropdown-toggle nav-link"
                data-toggle="dropdown"
              >
                <h6>{user?.userExists?.name}</h6>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <div class="user-header">
                  <div class="user-text">
                    <h6>{user?.userExists?.name}</h6>
                  </div>
                </div>

                <a class="dropdown-item" href="/user-profile">
                  Profile
                </a>

                <a class="dropdown-item" href="/" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            </li>
          ) : (
            <li class="nav-item">
              <a class="nav-link header-login" href="/login">
                login
              </a>

              <a class="nav-link header-login" href="/signup">
                signup
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
