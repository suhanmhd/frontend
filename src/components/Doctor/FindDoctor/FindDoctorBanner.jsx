import React from 'react'
import BannerImage from "../../../assets/images/doctor-team.jpg";

const FindDoctorBanner = () => {
  return (
    <><div className="container-fluid">
          <div className="find-doctor">
              <div className="banner-writing">
                  <div className="heading">
                      <span className="span">
                          <p>SEARCHING FOR DOCTORS ?</p>
                      </span>
                  </div>
                  <div className="heading">
                      <p>
                          Be A Part Of <br /> CLICK <span className="span"> N </span>{" "}
                          VISIT <br /> Appointment Program
                      </p>
                  </div>
                  <div className="heading">
                      <button className="btn btn-warning btn-lg" onClick={() => window.location = '#content-container'}>GET STARTED</button>
                  </div>
              </div>
              <div className="find-doctor-banner">
                  <img className="image" src={BannerImage} alt=""></img>
              </div>
          </div>
      </div>
      <div className="content-container" id="content-container">
              <div className="content">
                  <div className="faq">
                      <p>WHAT DO WE DO FOR YOU ?</p>
                  </div>
                  <div className="ans">
                      <p>
                          We offers you the best in class services for those who need
                          medical consultancy through online as well as scheduling an
                          appointment. <br /><br /> We provide services for the following categories :
                      </p>
                  </div>
              </div>
          </div></>
  )
}

export default FindDoctorBanner