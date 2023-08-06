import React from "react";
import UserLayout from "../../components/User/UserLayout";

const BookAppointments = () => {


  return (
    <>
      <UserLayout sideBar>
        <div class="content">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <div class="booking-doc-info">
                      <a href="doctor-profile.html" class="booking-doc-img">
                        <img
                          src="/assets/img/doctors/doctor-thumb-02.jpg"
                          alt="User Image"
                        />
                      </a>
                      <div class="booking-info">
                        <h4>
                          <a href="doctor-profile.html">Dr. Darren Elder</a>
                        </h4>
                        <div class="rating">
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star filled"></i>
                          <i class="fas fa-star"></i>
                          <span class="d-inline-block average-rating">35</span>
                        </div>
                        <p class="text-muted mb-0">
                          <i class="fas fa-map-marker-alt"></i> Newyork, USA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="card booking-schedule schedule-widget">
                  <div class="schedule-header">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="day-slot">
                          <ul>
                            <li class="left-arrow">
                              <a href="#">
                                <i class="fa fa-chevron-left"></i>
                              </a>
                            </li>
                            
                            <li>
                              <span>Mon</span>
                              <span class="slot-date">
                                11 Nov <small class="slot-year">2019</small>
                              </span>
                            </li>
                            <li>
                              <span>Tue</span>
                              <span class="slot-date">
                                12 Nov <small class="slot-year">2019</small>
                              </span>
                            </li>
                            <li>
                              <span>Wed</span>
                              <span class="slot-date">
                                13 Nov <small class="slot-year">2019</small>
                              </span>
                            </li>
                            <li>
                              <span>Thu</span>
                              <span class="slot-date">
                                14 Nov <small class="slot-year">2019</small>
                              </span>
                            </li>
                            <li>
                              <span>Fri</span>
                              <span class="slot-date">
                                15 Nov <small class="slot-year">2019</small>
                              </span>
                            </li>
                            <li>
                              <span>Sat</span>
                              <span class="slot-date">
                                16 Nov <small class="slot-year">2019</small>
                              </span>
                            </li>
                            <li>
                              <span>Sun</span>
                              <span class="slot-date">
                                17 Nov <small class="slot-year">2019</small>
                              </span>
                            </li>
                            <li class="right-arrow">
                              <a href="#">
                                <i class="fa fa-chevron-right"></i>
                              </a>
                            </li>


                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="schedule-cont">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="time-slot">
                          <ul class="clearfix">
                            
                            <li>
                              <a class="timing" href="#">
                                <span>9:00</span> <span>AM</span>
                              </a>
                              <a class="timing selected" href="#">
                                <span>10:00</span> <span>AM</span>
                              </a>
                              <a class="timing" href="#">
                                <span>11:00</span> <span>AM</span>
                              </a>
                            </li>
                            
                          
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="submit-section proceed-btn text-right">
                  <a href="checkout.html" class="btn btn-primary submit-btn">
                    Proceed to Pay
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </>
  );
};

export default BookAppointments;
