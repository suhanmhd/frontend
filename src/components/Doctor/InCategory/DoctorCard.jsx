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
              <img src={doctor.image ? doctor.image : "https://img.freepik.com/premium-vector/avatar-bearded-doctor-doctor-with-stethoscope-vector-illustrationxa_276184-31.jpg"} class="img-fluid" alt="User Image"/>
            </a>
          </div>
          <div class="doc-info-cont">
            <h4 class="doc-name"><a href="doctor-profile.html">Dr. {doctor.firstname}</a></h4>
            {/* <p class="doc-speciality">BDS, MDS - Oral & Maxillofacial Surgery</p> */}
            {/* <h5 class="doc-department"><img src="assets/img/specialities/specialities-05.png" class="img-fluid" alt="Speciality"/>Dentist</h5> */}
            <div className="rating">
  {Array.from({ length: 5 }).map((_, index) => (
    <i
      key={index}
      className={`fas fa-star ${index < doctor.averageRating ? "filled" : ""}`}
    ></i>
  ))}
  <span className="d-inline-block average-rating">
    ({doctor.averageRating})
  </span>
</div>
            <div class="clinic-details">
              {/* <p class="doc-location"><i class="fas fa-map-marker-alt"></i> Newyork, USA</p> */}
              {/* <ul class="clinic-gallery">
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
              </ul> */}
            </div>
            <div class="clinic-services">
              <span>{doctor.specialization}</span>
              {/* <span> Whitneing</span> */}
            </div>
          </div>
        </div>
        <div class="doc-info-right">
          <div class="clini-infos">
            <ul>
              <li><i class="far fa-thumbs-up"></i> 0%</li>
              <li><i class="far fa-comment"></i> {doctor.email}</li>
              <li><i class="fas fa-map-marker-alt"></i>{doctor.place}</li>
              <li><i class="far fa-money-bill-alt"></i>  {doctor.feesPerConsultation}<i class="fas fa-info-circle" data-toggle="tooltip" title="Lorem Ipsum"></i></li>
            </ul>
          </div>
          <div class="clinic-booking">
            <Link to={`/single-doctor/${doctor.id}`}>
            View Profile
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