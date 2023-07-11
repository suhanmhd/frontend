import './DoctorCard.css'
import React from 'react'
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn,
  } from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';

const DoctorCard = (props) => {

  const navigate = useNavigate();

  return (
        <MDBRow className="row-cols-1 row-cols-md-1 g-4">
          <MDBCol>
            {/* {props.doctor && ( */}
                <MDBCard alignment="center">
                  <MDBCardImage
                    src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQmcqzN9KSMx-hxPJfiB3yt59uQhN9R4IqjisfUEitJv9lbQVN14QYLsUfmgiH-AoH2VgTFMdRBaTWa9XXpU9aMV1fveYnRgRsf4peaqt_rCR_qyQ483NgjHHdhfYpOr8axyGWhk3DHw5lAUQkXl6NGMugPS7k6Apw7CUjqRMgwAv01i2_AXyRumuBfw/s458/blank-profile-picture-hd-images-photo.JPG"
                    alt="profile"
                    position="top"
                    height="300px"
                  />
                  <MDBCardBody>
                    <MDBCardTitle>
                      Dr. {props.doctor.firstname + " " + props.doctor.lastname}
                    </MDBCardTitle>
                    <MDBCardText>
                      <b>{props.doctor.specialization.category}</b>
                    </MDBCardText>
                    <MDBCardText>
                    <p>Experience : {props.doctor.experience} years</p>
                    </MDBCardText>
                    <MDBCardText>
                      <p>Fees per Consultation : Rs. {props.doctor.feesPerConsultation}</p>
                    </MDBCardText>
                    <MDBCardText>
                      {/* <p>Timings : {props.doctor.timings} </p> */}
                    </MDBCardText>
                    <MDBBtn onClick={() => navigate(`/single-doctor/${props.doctor.id}`)}>View Profile</MDBBtn>
                  </MDBCardBody>
                </MDBCard>
                    {/* )} */}
          </MDBCol>
        </MDBRow>
      // </div>  
      )
}

export default DoctorCard