import React, { useEffect, useState } from "react";
import { getUserById } from "../../axios/services/DoctorServices";
import { useParams } from "react-router-dom";

const PatientProfileLayout = ({children}) => {
  const [userDetails, setUserDetails] = useState("");

  const token = JSON.parse(localStorage.getItem("doctor")).token;
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { userDetails } = await getUserById(token, id);
      setUserDetails(userDetails);
    };
    fetchData();
  }, []);

  return (
    <>
      <div class="main-wrapper">
        <Header doctor={doctor} />
        <BreadcumbBar />
        <Main
        userDetails={userDetails} 
          children={children}
      />
      </div>
    </>
    )
};

function Header({ doctor }) {
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
              <img src="/assets/img/logo.png" class="img-fluid" alt="Logo" />
            </a>
            <a id="menu_close" class="menu-close" href="javascript:void(0);">
              <i class="fas fa-times"></i>
            </a>
          </div>
        </div>
        <ul class="nav header-navbar-rht">
          <li class="nav-item contact-item">
            <div class="header-contact-img">
              <i class="far fa-hospital"></i>
            </div>
            <div class="header-contact-detail">
              <p class="contact-header">Contact</p>
              <p class="contact-info-header"> +1 315 369 5943</p>
            </div>
          </li>

          <li class="nav-item dropdown has-arrow logged-item">
            <span class="dropdown-toggle nav-link" data-toggle="dropdown">
              {doctor?.doctorExists?.name &&
                doctor.doctorExists.name.charAt(0).toUpperCase() +
                  doctor.doctorExists.name.slice(1)}
            </span>
            {/* <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                  <span class="user-img">
                    <img
                      class="rounded-circle"
                      src="assets/img/doctors/doctor-thumb-02.jpg"
                      width="31"
                      alt="Darren Elder"
                    />
                  </span>
                </a> */}

            <div class="dropdown-menu dropdown-menu-right">
              <div class="user-header">
                <div class="avatar avatar-sm">
                  <img
                    src="/assets/img/doctors/doctor-thumb-02.jpg"
                    alt="User Image"
                    class="avatar-img rounded-circle"
                  />
                </div>
                <div class="user-text">
                  <h6>
                    {" "}
                    Dr.
                    {doctor?.doctorExists?.name &&
                      doctor.doctorExists.name.charAt(0).toUpperCase() +
                        doctor.doctorExists.name.slice(1)}
                  </h6>
                  <p class="text-muted mb-0">Doctor</p>
                </div>
              </div>
              <a class="dropdown-item" href="doctor-dashboard.html">
                Dashboard
              </a>
              <a class="dropdown-item" href="doctor-profile-settings.html">
                Profile
              </a>
              <a class="dropdown-item" href="login.html">
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function BreadcumbBar() {
  return (
    <div class="breadcrumb-bar">
      <div class="container-fl-uid">
        <div class="row align-items-center justify-start">
          <div class="col-md-12 col-12">
            <nav aria-label="breadcrumb" class="page-breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Dashboard
                </li>
              </ol>
            </nav>
            <h2 class="breadcrumb-title">Dashboard</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

function Main({ userDetails, children }) {
    return (
        <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar dct-dashbd-lft">
              <div class="card widget-profile pat-widget-profile">
                <div class="card-body">
                  <div class="pro-widget-content">
                    <div class="profile-info-widget">
                      {userDetails.image ? (
                        <a class="booking-doc-img">
                          <img src={userDetails.image} alt="User" />
                        </a>
                      ) : (
                        <a class="booking-doc-img">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1lT_yeCLgs_2_KigfJY4uQMDnxIKJItb3yQ&usqp=CAU"
                            alt="User"
                          />
                        </a>
                      )}
                      {/* </a> */}
                      <div class="profile-det-info">
                        <h3>
                          {userDetails.firstname} {userDetails.lastname}
                        </h3>

                        <div class="patient-details">
                          <h5>
                            <b>Email :</b> {userDetails.email}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="patient-info">
                    <ul>
                      <li>
                        Age <span>{userDetails.age}</span>
                      </li>
                      <li>
                        Gender <span>{userDetails.gender}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-7 col-lg-8 col-xl-9 dct-appoinment">
                {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

export default PatientProfileLayout;
