import React from "react";
import Layout from "../../components/Doctor/Layout";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const scheduleData = {
  doctor_id: "12345",
  available_slots: [
    {
      date: "2023-07-15",
      times: ["09:00 AM", "10:30 AM", "02:00 PM"],
    },
    {
      date: "2023-07-16",
      times: ["11:00 AM", "03:30 PM", "05:00 PM"],
    },
  ],
};

const SheduleTimings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [timing, setTiming] = useState("");

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleAddTiming = (e) => {
    e.preventDefault();
    if (selectedDay) {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const selectedDayIndex = daysOfWeek.indexOf(selectedDay);
      let daysToAdd;
      if (selectedDayIndex >= currentDay) {
        daysToAdd = selectedDayIndex - currentDay;
      } else {
        daysToAdd = 7 - currentDay + selectedDayIndex;
      }

      const selectedDate = new Date(
        currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000
      );

      const selectedDateString = selectedDate.toISOString().split("T")[0];

      const updatedData = { ...data };

      const selectedSlot = updatedData.available_slots.find(
        (slot) =>
          new Date(slot.date).getDay() === daysOfWeek.indexOf(selectedDay)
      );

      if (selectedSlot) {
        selectedSlot.times = selectedSlot.times && [
          ...selectedSlot.times,
          timing,
        ];

        setData(updatedData);
      } else {
        const newSlot = {
          date: selectedDateString,
          times: [timing],
        };
        updatedData.available_slots.push(newSlot);
        setData(updatedData);
      }
    }
  };

  const handleRemovingTiming = (timesId) => {
    if(selectedDay){
     
      const updatedData = { ...data };

      const selectedSlot = updatedData.available_slots.find(
        (slot) =>
          new Date(slot.date).getDay() === daysOfWeek.indexOf(selectedDay)
      );

      if(selectedSlot){
        const updatedTimes = selectedSlot.times.filter((_time,index) => index !== timesId);
        selectedSlot.times = updatedTimes
        setData(updatedData);
      }
    }

  };

  useEffect(() => {
    setData(scheduleData);
  }, []);


  
  useEffect(() => {
    console.log(data);
  }, [data]);



  return (
    <Layout>
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Schedule Timings</h4>
          <div class="profile-box">
            <div class="row">
              <div class="col-lg-4">
                <div class="form-group">
                  <label>Timing Slot Duration</label>
                  <select class="select form-control">
                    <option>-</option>
                    <option>15 mins</option>
                    <option selected="selected">30 mins</option>
                    <option>45 mins</option>
                    <option>1 Hour</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <div class="card schedule-widget mb-0">
                  {/* <!-- Schedule Header --> */}
                  <div class="schedule-header">
                    {/* <!-- Schedule Nav --> */}
                    <div class="schedule-nav">
                      <ul class="nav nav-tabs nav-justified">
                        {daysOfWeek.map((day) => {
                          return (
                            <li class="nav-item">
                              <Link
                                key={day}
                                onClick={() => handleDayClick(day)}
                                className={selectedDay === day ? "active" : ""}
                                class="nav-link"
                                data-toggle="tab"
                                href="#slot_monday"
                              >
                                {day}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    {/* <!-- /Schedule Nav --> */}
                  </div>
                  {/* <!-- /Schedule Header --> */}

                  {/* <!-- Schedule Content --> */}
                  <div class="tab-content schedule-cont">
                    {/* <!-- Sunday Slot --> */}
                    <div id="slot_sunday" class="tab-pane fade">
                      <h4 class="card-title d-flex justify-content-between">
                        <span>Time Slots</span>
                        <Link
                          class="edit-link"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <i class="fa fa-plus-circle"></i> Add Slot
                        </Link>
                      </h4>
                      <p class="text-muted mb-0">Not Available</p>
                    </div>
                    {/* <!-- /Sunday Slot --> */}

                    {/* <!-- Monday Slot --> */}
                    <div id="slot_monday" class="tab-pane fade show active">
                      <h4 class="card-title d-flex justify-content-between">
                        <span>Time Slots</span>

                        <Link
                          class="edit-link"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          <i class="fa fa-edit mr-1"></i>Edit
                        </Link>
                      </h4>

                      {/* <!-- Slot List --> */}

                      <div class="doc-times">
                        {data &&
                          data.available_slots
                            .filter((slot) => {
                              const slotDay = new Date(slot.date).getDay();
                              return selectedDay === daysOfWeek[slotDay];
                            })
                            .map((slot) => {
                              return slot.times.map((time,index) => (
                                <div className="doc-slot-list">
                                  {time}
                                  <Link
                                    href="javascript:void(0)"
                                    className="delete_schedule"
                                    onClick={()=>handleRemovingTiming(index)}
                                  >
                                    <i className="fa fa-times"></i>
                                  </Link>
                                </div>
                              ));
                            })}
                      </div>

                      {/* <!-- /Slot List --> */}
                    </div>
                  </div>
                  {/* <!-- /Schedule Content --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Form  */}
      <div
        class={`modal fade custom-modal ${isOpen && "show"}`}
        style={{ display: isOpen ? "block" : "none", paddingRight: "17px" }}
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Time Slots</h5>
              <button
                type="button"
                class="close"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleAddTiming}>
                <div class="hours-info">
                  <div class="row form-row hours-cont">
                    <div class="col-12 col-md-12 px-5">
                      <div class="row form-row ">
                        <div class="col-12 col-md-12">
                          <div class="form-group">
                            <label>Start Time</label>
                            <select
                              class="form-control"
                              value={timing}
                              onChange={(e) => setTiming(e.target.value)}
                            >
                              <option>-</option>
                              <option>10.00 am</option>
                              <option>10.30 am</option>
                              <option>11.00 am</option>
                              <option>11.30 am</option>
                              <option>12.00 am</option>
                              <option>12.30 am</option>
                              <option>2.00 am</option>
                              <option>2.30 am</option>
                              <option>3.00 am</option>
                              <option>3.30 am</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="add-more mb-3 px-4">
                  <a href="javascript:void(0);" class="add-hours">
                    <i class="fa fa-plus-circle"></i> Add More
                  </a>
                </div>

                <div class="submit-section text-center">
                  <button type="submit" class="btn btn-primary submit-btn">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class={`fade ${isOpen ? "modal-backdrop show" : "fade"}`}></div>
    </Layout>
  );
};

export default SheduleTimings;
