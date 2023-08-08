import React, { useEffect, useState } from "react";
import UserLayout from "../../components/User/UserLayout";
import { getDoctorAvailableSlots } from "../../axios/services/HomeServices";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Hidden } from "@mui/material";
import { getSingleDoctor } from "../../axios/services/DoctorServices";

const BookAppointments = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  const [appointmentDetail, setAppointmentDetail] = useState(() => {
    const storedData = localStorage.getItem("appointmentDetail");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [doctor, setDoctor] = useState(null);

  const [date, setDate] = useState(null);

  const [selectedSlot, setSelectedSlot] = useState({
    slotId: "",
    startTime: "",
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getDoctorAvailableSlots(token, docId);
      const docData = await getSingleDoctor(docId);
      setAppointmentDetail(data.slot);
      setDoctor(docData.doctorDetails);
    }
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "appointmentDetail",
      JSON.stringify(appointmentDetail)
    );
  }, [appointmentDetail]);

  const formatDate = (dateString) => {
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const weekDay = date
      .toLocaleString("en-US", { weekday: "short" })
      .toUpperCase();

    return `${weekDay} ${day} ${month}`;
  };

  const handleDayClick = (clickedDate) => {
    console.log(clickedDate);
    setDate(clickedDate);
  };

  const handleBookingSlot = () => {
    if (selectedSlot && date) {
      const BookingDetails = {
        slotId: selectedSlot.slotId,
        startTime: selectedSlot.startTime,
        date: date,
      };

      console.log(BookingDetails);

      localStorage.setItem("bookingDetails", JSON.stringify(BookingDetails));
      navigate(`/payment-page/${docId}`);
    } else {
      alert("Select Slot and date");
    }
  };

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
                          src={doctor?.image ? doctor.image : "/assets/img/doctors/doctor-thumb-02.jpg"}
                          alt="User Image"
                        />
                      </a>
                      <div class="booking-info">
                        <h4>
                          <a href="doctor-profile.html">Dr.{doctor?.firstname} {doctor?.lastname}</a>
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
                          <ul style={{ display: "flex", overflow: "hidden" }}>
                            <li class="left-arrow">
                              <a href="#">
                                <i class="fa fa-chevron-left"></i>
                              </a>
                            </li>

                            {appointmentDetail?.slotList?.map((slot) => (
                              <li
                                onClick={() => handleDayClick(slot.date)}
                                style={{ cursor: "pointer" }}
                              >
                                <span>
                                  {formatDate(slot.date).split(" ").slice(0, 1)}
                                </span>
                                <span class="slot-date">
                                  {formatDate(slot.date).split(" ").slice(1)}
                                </span>
                              </li>
                            ))}

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
                          <AvailableSlots
                            date={
                              date ? date : appointmentDetail?.slotList[0]?.date
                            }
                            scheduledTimeSlots={appointmentDetail?.slotList}
                            selectedSlot={selectedSlot}
                            setSelectedSlot={setSelectedSlot}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="submit-section proceed-btn text-right">
                  <button
                    onClick={handleBookingSlot}
                    class="btn btn-primary submit-btn"
                  >
                    Book Appointment
                  </button>
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

function AvailableSlots({
  date,
  scheduledTimeSlots,
  selectedSlot,
  setSelectedSlot,
}) {
  const [timeSlots, setTimeSlots] = useState([]);

  const handleSlotClick = (slotId, startTime) => {
    setSelectedSlot({
      slotId: slotId,
      startTime: startTime,
    });
  };

  useEffect(() => {
    const filterdData = scheduledTimeSlots?.filter(
      (slot) => slot.date === date
    );
    // console.log(filterdData[0]?.slots)
    setTimeSlots(filterdData[0]?.slots);
  }, [date]);

  const groupedTimeSlots = [];
  const groupSize = 3;

  for (let i = 0; i < timeSlots?.length; i += groupSize) {
    groupedTimeSlots.push(timeSlots?.slice(i, i + groupSize));
  }

  console.log(groupedTimeSlots, "==");

  return (
    <ul class="clearfix">
      {groupedTimeSlots.map((timeSlotGroup, index) => (
        <li key={index}>
          {timeSlotGroup.map((slot, slotIndex) => (
            <a
              key={slotIndex}
              onClick={() =>
                !slot.status && handleSlotClick(slot.id, slot.startTime)
              }
              className={`timing ${
                slot.id === selectedSlot.slotId && !slot.status
                  ? "selected"
                  : ""
              } `}
              style={
                slot.status
                  ? { backgroundColor: "#DC143C", color: "white" }
                  : null
              }
              href="#"
            >
              <span>{slot.startTime}</span>
            </a>
          ))}
        </li>
      ))}
    </ul>
  );
}
