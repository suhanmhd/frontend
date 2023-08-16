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

  // const { doctor } = useSelector((state) => ({ ...state.doctor }));
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  //SAMPLE DATA REMOVE NEEDED
  // const doctor = {
  //   id: "c7ba1801-9803-4283-b0ad-e470bfd16130",
  //   firstname: "Raj",
  //   lastname: "k",
  //   email: "suhans@gmail.com",
  //   name: "raj",
  //   enabled: false,
  //   isApproved: "approved",
  //   timings: null,
  //   specialization: "Dentist",
  //   experience: "5",
  //   feesPerConsultation: 800,
  //   license: "2323",
  // };

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
      name: "Schedule Timings",
      path: "/schedule-timings",
      icon: "fas fa-hourglass-start",
    },
    {
      name: "Messages",
      path: `/message-requests`,
      icon: "fa-solid fa-message",
    },
    {
      name: "Profile",
      path: `/doctorProfile/${doctor && doctor.doctorExists.id}`,
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
      <div class="main-wrapper">
        <Header doctor={doctor} />
        <BreadcumbBar />
        <Main
        doctor={doctor} 
          children={children}
          handleLogout={handleLogout}
          DoctorSidebarData={DoctorSidebarData}
          location={location}
        />
      </div>
    </>
  );
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
          {doctor?.doctorExists?.name && doctor.doctorExists.name.charAt(0).toUpperCase() + doctor.doctorExists.name.slice(1)}

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
                    {doctor?.doctorExists?.name && doctor.doctorExists.name.charAt(0).toUpperCase() + doctor.doctorExists.name.slice(1)}
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

function Main({ doctor, DoctorSidebarData, children, handleLogout, location }) {
  return (
    <div class="content">
      <div class="container-fl-uid">
        <div class="row">
          <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">

            {/* <!-- Profile Sidebar --> */}
            
            <div class="profile-sidebar">
              <div class="widget-profile pro-widget-content">
                <div class="profile-info-widget">
                  {/* <a href="#" class="booking-doc-img">
                    <img
                      src="assets/img/doctors/doctor-thumb-02.jpg"
                      alt="User Image"
                    />
                  </a> */}

                  <div class="profile-det-info">
                    <h3 className="text-slate-700 ms-3">
                    Dr.{doctor?.doctorExists?.name && doctor.doctorExists.name.charAt(0).toUpperCase() + doctor.doctorExists.name.slice(1)}
                   
                    </h3>

                    <div class="patient-details">
                      <h5 class="mb-0">
                        BDS, MDS - Oral & Maxillofacial Surgery
                      </h5>
                    </div>
                  </div>

                </div>
              </div>
              
              <div class="dashboard-widget">
                <nav class="dashboard-menu">
                  {DoctorSidebarData.map((menu) => {
                    const isActive = location.pathname === menu.path;
                    return (
                      <ul>
                        <li className={`${isActive && "active"}`}>
                          <Link
                            className="text-slate-700 uppercase "
                            to={menu.path}
                          >
                            <i className={menu.icon}></i>
                            {menu.name}
                          </Link>
                        </li>
                      </ul>
                    );
                  })}

                  <ul>
                    <li onClick={handleLogout}>
                      <Link to="/doctorLogin">
                        <i className="fa-solid fa-right-from-bracket"></i>{" "}
                        Logout
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>


            {/* Profile Sidebar  */}

            {/* <!-- Search Filter --> */}
							{/* <div class="card search-filter">
								<div class="card-header">
									<h4 class="card-title mb-0">Search Filter</h4>
								</div>
								<div class="card-body">
								<div class="filter-widget">
									<div class="cal-icon">
										<input type="text" class="form-control datetimepicker" placeholder="Select Date"/>
									</div>			
								</div>
								<div class="filter-widget">
									<h4>Gender</h4>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="gender_type" checked/>
											<span class="checkmark"></span> Male Doctor
										</label>
									</div>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="gender_type"/>
											<span class="checkmark"></span> Female Doctor
										</label>
									</div>
								</div>
								<div class="filter-widget">
									<h4>Select Specialist</h4>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist" checked/>
											<span class="checkmark"></span> Urology
										</label>
									</div>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist" checked/>
											<span class="checkmark"></span> Neurology
										</label>
									</div>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist"/>
											<span class="checkmark"></span> Dentist
										</label>
									</div>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist"/>
											<span class="checkmark"></span> Orthopedic
										</label>
									</div>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist"/>
											<span class="checkmark"></span> Cardiologist
										</label>
									</div>
									<div>
										<label class="custom_check">
											<input type="checkbox" name="select_specialist"/>
											<span class="checkmark"></span> Cardiologist
										</label>
									</div>
								</div>
									<div class="btn-search">
										<button type="button" class="btn btn-block">Search</button>
									</div>	
								</div>
							</div> */}
							{/* <!-- /Search Filter --> */}
          </div>

          <div class="col-md-7 col-lg-8 col-xl-9">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
