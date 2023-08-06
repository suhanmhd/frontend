import React from "react";
import Layout from "../../components/Doctor/Layout";
import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import { Link } from "react-router-dom";
import {
  addDoctorScheduledTimes,
  deleteDoctorScheduledTimes,
  getDoctorScheduledTimes,
} from "../../axios/services/DoctorServices";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SheduleTimings = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  const [scheduleData, setScheduleData] = useState([]);

  const [timing, setTiming] = useState("");

  const [slotId, setSlotId] = useState("");

  const [fetchData, setFetchData] = useState(null);

  const token = JSON.parse(localStorage.getItem("doctor")).token;
  const docId = JSON.parse(localStorage.getItem("doctor")).doctorExists.id;

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const convertToTimeFormat = (timing, addOnTime) => {
    const [hours, minutes] = timing.split(":").map(Number);

    let totalMinutes = hours * 60 + minutes;
    totalMinutes += addOnTime || 0;

    const convertedHours = Math.floor(totalMinutes / 60) % 12;
    const convertedMinutes = totalMinutes % 60;

    const ampm = totalMinutes >= 720 ? "PM" : "AM";

    return `${convertedHours === 0 ? 12 : convertedHours}:${String(
      convertedMinutes
    ).padStart(2, "0")} ${ampm}`;
  };

  const handleAddTiming = (e) => {
    e.preventDefault();
    const addOnTimeInMinutes = 30;

    const startTime = convertToTimeFormat(timing);
    const endTime = convertToTimeFormat(timing, addOnTimeInMinutes);

    const slotOverlap = scheduleData.find(
      (slot) =>
        selectedDate === slot.date &&
        startTime >= slot.startTime &&
        startTime <= slot.endTime
    );

    const is30MinutesBeforeStartTime = scheduleData.find(
      (slot) =>
        selectedDate === slot.date &&
        startTime >= convertToTimeFormat(slot.startTime, -addOnTimeInMinutes) &&
        endTime <= slot.startTime
    );

    if (!slotOverlap && !is30MinutesBeforeStartTime) {
      setScheduleData([
        ...scheduleData,
        {
          doctorId: docId,
          date: selectedDate,
          startTime: startTime,
          endTime: endTime,
          status: false,
        },
      ]);
      setIsOpen((prev) => !prev);

      toast.success("slot added successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("slot not available", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleRemovingTiming = async (timesId) => {
    setSlotId(timesId);
  };

  const fetchAllData = async () => {
    const data = await getDoctorScheduledTimes(token, docId);
    setFetchData(data.slot);
  };


  useEffect(() => {
    fetchAllData();
  }, [token, docId, slotId]);


  useEffect(() => {
    const addData = async () => {
      try {
        await addDoctorScheduledTimes(token, scheduleData);
        console.log(scheduleData);
      } catch (error) {
        console.error("Error adding data:", error);
      }
    };

    addData().then(() => {
      fetchAllData();
    });
  }, [token, scheduleData]);

  useEffect(() => {
    const deleteData = async () => {
      try {
        if (slotId) {
          const updatedScheduleData = scheduleData.filter(
            (item) => item.timesId !== slotId
          );

          await deleteDoctorScheduledTimes(token, slotId);
          setSlotId("");
          setScheduleData(updatedScheduleData);

          toast.success("Slot deleted successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    };

    deleteData().then(() => {
      fetchAllData();
    });
  }, [token, scheduleData, slotId]);


  
  const handleDateChange = (date) => {
    const inputDate = new Date(date);

    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");

    const convertedDateStr = `${year}-${month}-${day}`;

    setSelectedDate(convertedDateStr);
  };

  return (
    <Layout>
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Schedule Timings</h4>
          <div class="profile-box">
            <div class="row">
              <div class="col-lg-4">
                <div class="form-group">
                  <label class="mr-3">Add Available Slot's </label>
                  <DatePicker onChange={handleDateChange} />
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
                        {fetchData?.map((slot, index) => {
                          return (
                            <>
                              {slot?.slots.length > 0 ? (
                                <li class="nav-item" key={index}>
                                  <Link
                                    key={slot.date}
                                    onClick={() => handleDateClick(slot.date)}
                                    className={
                                      selectedDate === slot.date ? "active" : ""
                                    }
                                    class="nav-link"
                                    data-toggle="tab"
                                    href="#slot_monday"
                                  >
                                    {slot.date}
                                  </Link>
                                </li>
                              ) : (
                                ""
                              )}
                            </>
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
                        {fetchData
                          ?.filter((item) => selectedDate === item.date)
                          .map((item) =>
                            item.slots.map((slot, index) => (
                              <div
                                className="doc-slot-list"
                                style={
                                  slot.status
                                    ? {
                                        backgroundColor: "#FFC72C",
                                        borderColor: "#FFC72C",
                                      }
                                    : {}
                                }
                                key={index}
                              >
                                {slot.status && (
                                  <span
                                    style={{
                                      color: "white",
                                      margin: "0px 5px",
                                    }}
                                  >
                                    Booked
                                  </span>
                                )}
                                {`${slot.startTime} - ${slot.endTime}`}

                                {!slot.status && (
                                  <Link
                                    href="javascript:void(0)"
                                    className="delete_schedule"
                                    onClick={() =>
                                      handleRemovingTiming(slot.id)
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </Link>
                                )}
                              </div>
                            ))
                          )}
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

                            <input
                              value={timing}
                              onChange={(e) => setTiming(e.target.value)}
                              type="time"
                              class="custom-time-input form-control"
                            />

                            {/* <select
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
                            </select> */}
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
