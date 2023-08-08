import React, { useState } from "react";

// import { DoctorSidebarData } from "../../Data/Data";
import "./UserLayout.css";
import { useDispatch } from "react-redux";

import { setLogout } from "../../redux/features/authSlice";
import Navbar from "../Navbar";

const UserLayout = ({ children, sideBar, handleSearch, searchData , setSearchData }) => {
  return (
    <>
      <div class="main-wrapper">
        <Navbar />
        <BreadcumbBar />
        <Main children={children} sideBar={sideBar} handleSearch={handleSearch}  searchData={searchData} setSearchData={setSearchData}/>
      </div>
    </>
  );
};

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

function Main({ children, sideBar, handleSearch, searchData, setSearchData }) {
  


  return (
    <div class="content">
      <div class="container-fl-uid">
        <div class="row ">
          {/* <!-- Search Filter --> */}
          {sideBar ? (
            ""
          ) : (
            <div class="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              <div class="card search-filter">
                <div class="card-header">
                  <h4 class="card-title mb-0">Search Filter</h4>
                </div>
                <div class="card-body">
                  <div class="filter-widget">
                    <div class="">
                      <input
                        value={searchData}
                        onChange={(e) => setSearchData(e.target.value)}
                        type="text"
                        class="form-control datetimepicker"
                        placeholder="Search"
                      />
                    </div>
                  </div>
                  <div class="filter-widget">
                    <h4>Gender</h4>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="gender_type" checked />
                        <span class="checkmark"></span> Male Doctor
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="gender_type" />
                        <span class="checkmark"></span> Female Doctor
                      </label>
                    </div>
                  </div>
                  <div class="filter-widget">
                    <h4>Select Specialist</h4>
                    <div>
                      <label class="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          checked
                        />
                        <span class="checkmark"></span> Urology
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input
                          type="checkbox"
                          name="select_specialist"
                          checked
                        />
                        <span class="checkmark"></span> Neurology
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span class="checkmark"></span> Dentist
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span class="checkmark"></span> Orthopedic
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span class="checkmark"></span> Cardiologist
                      </label>
                    </div>
                    <div>
                      <label class="custom_check">
                        <input type="checkbox" name="select_specialist" />
                        <span class="checkmark"></span> Cardiologist
                      </label>
                    </div>
                  </div>
                  <div class="btn-search">
                    <button
                      onClick={handleSearch}
                      type="button"
                      class="btn btn-block"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* <!-- /Search Filter --> */}
            </div>
          )}

          <div
            class={
              !sideBar
                ? "col-md-7 col-lg-8 col-xl-9"
                : "col-md-7 col-lg-8 col-xl-9 mx-auto"
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
