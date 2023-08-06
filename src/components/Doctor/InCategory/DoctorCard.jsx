// import './DoctorCard.css'
import React from 'react'
import { Link } from 'react-router-dom'

const DoctorCard = ({doctor}) => {


  return (
    <div class="card">
    <div class="card-body">
      <div class="doctor-widget">
        <div class="doc-info-left">
          <div class="doctor-img">
            <a href="doctor-profile.html">
              <img src="assets/img/doctors/doctor-thumb-02.jpg" class="img-fluid" alt="User Image"/>
            </a>
          </div>
          <div class="doc-info-cont">
            <h4 class="doc-name"><a href="doctor-profile.html">Dr. {doctor.firstname}</a></h4>
            <p class="doc-speciality">BDS, MDS - Oral & Maxillofacial Surgery</p>
            <h5 class="doc-department"><img src="assets/img/specialities/specialities-05.png" class="img-fluid" alt="Speciality"/>Dentist</h5>
            <div class="rating">
              <i class="fas fa-star filled"></i>
              <i class="fas fa-star filled"></i>
              <i class="fas fa-star filled"></i>
              <i class="fas fa-star filled"></i>
              <i class="fas fa-star"></i>
              <span class="d-inline-block average-rating">(35)</span>
            </div>
            <div class="clinic-details">
              <p class="doc-location"><i class="fas fa-map-marker-alt"></i> Newyork, USA</p>
              <ul class="clinic-gallery">
                <li>
                  <a href="assets/img/features/feature-01.jpg" data-fancybox="gallery">
                    <img src="assets/img/features/feature-01.jpg" alt="Feature"/>
                  </a>
                </li>
                <li>
                  <a href="assets/img/features/feature-02.jpg" data-fancybox="gallery">
                    <img  src="assets/img/features/feature-02.jpg" alt="Feature"/>
                  </a>
                </li>
                <li>
                  <a href="assets/img/features/feature-03.jpg" data-fancybox="gallery">
                    <img src="assets/img/features/feature-03.jpg" alt="Feature"/>
                  </a>
                </li>
                <li>
                  <a href="assets/img/features/feature-04.jpg" data-fancybox="gallery">
                    <img src="assets/img/features/feature-04.jpg" alt="Feature"/>
                  </a>
                </li>
              </ul>
            </div>
            <div class="clinic-services">
              <span>Dental Fillings</span>
              <span> Whitneing</span>
            </div>
          </div>
        </div>
        <div class="doc-info-right">
          <div class="clini-infos">
            <ul>
              <li><i class="far fa-thumbs-up"></i> 100%</li>
              <li><i class="far fa-comment"></i> 35 Feedback</li>
              <li><i class="fas fa-map-marker-alt"></i> Newyork, USA</li>
              <li><i class="far fa-money-bill-alt"></i> $50 - $300 <i class="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i></li>
            </ul>
          </div>
          <div class="clinic-booking">
            <Link to={`/single-doctor/${doctor.id}`}>
            <a class="view-pro-btn">View Profile</a>
            </Link>
            <Link to={`/book-slot/${doctor.id}`} class="apt-btn" >Book Appointment</Link>
          </div>
        </div>
      </div>
    </div>
  </div> 
      )
}

export default DoctorCard