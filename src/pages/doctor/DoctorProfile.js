import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../../axios/services/DoctorServices";
import Layout from "../../components/Doctor/Layout";

import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";

import { toast } from "react-toastify";
import { TimePicker } from "antd";
import moment from "moment";

// const doctorProfile = {
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

const DoctorProfile = () => {
  const [formValue, setFormValue] = useState({});
  // useState(doctorProfile)
  

  const {
    firstname,
    lastname,
    // specialization,
    email,
    // password,
    // confirmPassword,
    experience,
    timings,
    feesPerConsultation,
  } = formValue;

  console.log(formValue)

  const timing = timings && [
    moment(timings[0], "h:mm a"),
    moment(timings[1], "h:mm a"),
  ];
  // const {doctor} = useSelector((state) => (state.doctor))
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  // const doctor = doctorProfile; // not need

  const { loading, error } = useSelector((state) => ({ ...state.doctor }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  // const { docId } = useParams();
  const { docId } = useParams();

  const token = JSON.parse(localStorage.getItem("doctor")).token;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDoctorProfile(token, docId);
      // const data = doctorProfile;
      setFormValue(data);
    };
    fetchData();
  }, []);

  timings && console.log(timings);

  //   const time = timings && {
  //     timings: [
  //       moment(timings[0]).format("HH:mm"),
  //       moment(timings[1]).format("HH:mm"),
  //     ],
  //   };

  //   console.log(time)
  //   console.log('time above')

  const handleSubmit = (e) => {
    e.preventDefault();
    updateDoctorProfile({ ...formValue }, token);
    // updateDoctorProfile({ ...formValue });
    // navigate("/doctorHome");
    toast.success("Profile updated");
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };

  return (
    <Layout>


      <div className="p-2">
        <h1>MANAGE YOUR PROFILE</h1>
      </div>
      {doctor && (
        <>
          <div
            style={{
              margin: "auto",
              // padding: "10px",
              maxWidth: "70%",
              alignContent: "center",
              marginTop: "50px",
            }}
          >
            <MDBCard alignment="left">
              {/* <MDBIcon fas icon="user-circle" className="fa-5x" /> */}
              <MDBCardBody>
                <MDBValidation
                  onSubmit={handleSubmit}
                  noValidate
                  className="row g-3"
                >
                  <h4>Personal Details : </h4>
                  <MDBValidationItem
                    className="col-md-6"
                    feedback="Please provide firstname"
                    invalid
                  >
                    <div className="col-md-12">
                      <MDBInput
                        label="Firstname"
                        type="text"
                        value={firstname}
                        name="firstname"
                        onChange={onInputChange}
                        required
                        invalid
                        disabled
                      />
                    </div>
                  </MDBValidationItem>
                  <MDBValidationItem
                    className="col-md-6"
                    feedback="Please provide lastname"
                    invalid
                  >
                    <div className="col-md-12">
                      <MDBInput
                        label="Lastname"
                        type="text"
                        value={lastname}
                        name="lastname"
                        onChange={onInputChange}
                        required
                        invalid
                        disabled
                      />
                    </div>
                  </MDBValidationItem>
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your email"
                    invalid
                  >
                    <div className="col-md-12">
                      <MDBInput
                        label="Email"
                        type="email"
                        value={email}
                        name="email"
                        onChange={onInputChange}
                        required
                        invalid
                        disabled
                      />
                    </div>
                  </MDBValidationItem>
                  <h4>Professional Details : </h4>

                  
                  
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your experience"
                    invalid
                  >
                    <div className="col-md-12">
                      <MDBInput
                        label="Experience"
                        type="experience"
                        value={experience}
                        name="experience"
                        onChange={onInputChange}
                        required
                        invalid
                      />
                    </div>
                  </MDBValidationItem>
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your feesPerConsultation"
                    invalid
                  >
                    <div className="col-md-12">
                      <MDBInput
                        label="Fees Per Consultation"
                        type="feesPerConsultation"
                        value={feesPerConsultation}
                        name="feesPerConsultation"
                        onChange={onInputChange}
                        required
                        invalid
                      />
                    </div>
                  </MDBValidationItem>
                  <MDBValidationItem
                    className="col-md-12"
                    feedback="Please provide your timings"
                    invalid
                  >
                    <div className="col-md-12">
                      <label
                        // onChange={onInputChange}
                        htmlFor="timings"
                        // name="timings"
                      >
                        Timings
                      </label>
                      <br />
                      <TimePicker.RangePicker
                        name="timings"
                        onChange={(value) => {
                          onInputChange({
                            target: {
                              name: "timings",
                              value: value.map((time) => time.format("h:mm a")),
                            },
                          });
                        }}
                        value={timing}
                        format="h:mm a"
                      />
                    </div>
                  </MDBValidationItem>
                  <div className="col-12">
                    <MDBBtn style={{ width: "100%" }} className="mt-2">
                      {loading && (
                        <MDBSpinner
                          size="sm"
                          role="status"
                          tag="span"
                          className="me-2"
                        />
                      )}
                      UPDATE YOUR PROFILE
                    </MDBBtn>
                  </div>
                </MDBValidation>
              </MDBCardBody>
            </MDBCard>
          </div>
        </>
      )}

      <div className="card">
        <div class="card-body">
          <h4 class="card-title">Schedule Timings</h4>
          <div class="profile-box">
            <div class="row">
              <div class="col-lg-4">
                <div class="mb-3">
                  <label class="durations">Timing Slot Duration</label>
                  <select class="form-select form-control">
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
                  <div class="schedule-header">
                    <div class="schedule-nav">
                      <ul class="nav nav-tabs nav-justified" role="tablist">
                        <li class="nav-item" role="presentation">
                          <a
                            class="nav-link"
                            data-bs-toggle="tab"
                            href="#slot_sunday"
                            aria-selected="false"
                            tabindex="-1"
                            role="tab"
                          >
                            Sunday
                          </a>
                        </li>
                        <li class="nav-item" role="presentation">
                          <a
                            class="nav-link active"
                            data-bs-toggle="tab"
                            href="#slot_monday"
                            aria-selected="true"
                            role="tab"
                          >
                            Monday
                          </a>
                        </li>
                        <li class="nav-item" role="presentation">
                          <a
                            class="nav-link"
                            data-bs-toggle="tab"
                            href="#slot_tuesday"
                            aria-selected="false"
                            tabindex="-1"
                            role="tab"
                          >
                            Tuesday
                          </a>
                        </li>
                        <li class="nav-item" role="presentation">
                          <a
                            class="nav-link"
                            data-bs-toggle="tab"
                            href="#slot_wednesday"
                            aria-selected="false"
                            tabindex="-1"
                            role="tab"
                          >
                            Wednesday
                          </a>
                        </li>
                        <li class="nav-item" role="presentation">
                          <a
                            class="nav-link"
                            data-bs-toggle="tab"
                            href="#slot_thursday"
                            aria-selected="false"
                            tabindex="-1"
                            role="tab"
                          >
                            Thursday
                          </a>
                        </li>
                        <li class="nav-item" role="presentation">
                          <a
                            class="nav-link"
                            data-bs-toggle="tab"
                            href="#slot_friday"
                            aria-selected="false"
                            tabindex="-1"
                            role="tab"
                          >
                            Friday
                          </a>
                        </li>
                        <li class="nav-item" role="presentation">
                          <a
                            class="nav-link"
                            data-bs-toggle="tab"
                            href="#slot_saturday"
                            aria-selected="false"
                            tabindex="-1"
                            role="tab"
                          >
                            Saturday
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="tab-content schedule-cont">
                    <div id="slot_sunday" class="tab-pane fade" role="tabpanel">
                      <h4 class="card-title d-flex justify-content-between">
                        <span>Time Slots</span>
                        <a
                          class="edit-link"
                          data-bs-toggle="modal"
                          href="#add_time_slot"
                        >
                          <i class="fa fa-plus-circle"></i> Add Slot
                        </a>
                      </h4>
                      <p class="text-muted mb-0">Not Available</p>
                    </div>

                    <div
                      id="slot_monday"
                      class="tab-pane fade show active"
                      role="tabpanel"
                    >
                      <h4 class="card-title d-flex justify-content-between">
                        <span>Time Slots</span>
                        <a
                          class="edit-link"
                          data-bs-toggle="modal"
                          href="#edit_time_slot"
                        >
                          <i class="fa fa-edit me-1"></i>Edit
                        </a>
                      </h4>

                      <div class="doc-times">
                        <div class="doc-slot-list">
                          8:00 pm - 11:30 pm
                          <a href="javascript:void(0)" class="delete_schedule">
                            <i class="fa fa-times"></i>
                          </a>
                        </div>
                        <div class="doc-slot-list">
                          11:30 pm - 1:30 pm
                          <a href="javascript:void(0)" class="delete_schedule">
                            <i class="fa fa-times"></i>
                          </a>
                        </div>
                        <div class="doc-slot-list">
                          3:00 pm - 5:00 pm
                          <a href="javascript:void(0)" class="delete_schedule">
                            <i class="fa fa-times"></i>
                          </a>
                        </div>
                        <div class="doc-slot-list">
                          6:00 pm - 11:00 pm
                          <a href="javascript:void(0)" class="delete_schedule">
                            <i class="fa fa-times"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div
                      id="slot_tuesday"
                      class="tab-pane fade"
                      role="tabpanel"
                    >
                      <h4 class="card-title d-flex justify-content-between">
                        <span>Time Slots</span>
                        <a
                          class="edit-link"
                          data-bs-toggle="modal"
                          href="#add_time_slot"
                        >
                          <i class="fa fa-plus-circle"></i> Add Slot
                        </a>
                      </h4>
                      <p class="text-muted mb-0">Not Available</p>
                    </div>

                    <div
                      id="slot_wednesday"
                      class="tab-pane fade"
                      role="tabpanel"
                    >
                      <h4 class="card-title d-flex justify-content-between">
                        <span>Time Slots</span>
                        <a
                          class="edit-link"
                          data-bs-toggle="modal"
                          href="#add_time_slot"
                        >
                          <i class="fa fa-plus-circle"></i> Add Slot
                        </a>
                      </h4>
                      <p class="text-muted mb-0">Not Available</p>
                    </div>

                    <div
                      id="slot_thursday"
                      class="tab-pane fade"
                      role="tabpanel"
                    >
                      <h4 class="card-title d-flex justify-content-between">
                        <span>Time Slots</span>
                        <a
                          class="edit-link"
                          data-bs-toggle="modal"
                          href="#add_time_slot"
                        >
                          <i class="fa fa-plus-circle"></i> Add Slot
                        </a>
                      </h4>
                      <p class="text-muted mb-0">Not Available</p>
                    </div>

                    <div id="slot_friday" class="tab-pane fade" role="tabpanel">
                      <h4 class="card-title d-flex justify-content-between">
                        <span>Time Slots</span>
                        <a
                          class="edit-link"
                          data-bs-toggle="modal"
                          href="#add_time_slot"
                        >
                          <i class="fa fa-plus-circle"></i> Add Slot
                        </a>
                      </h4>
                      <p class="text-muted mb-0">Not Available</p>
                    </div>

                    <div
                      id="slot_saturday"
                      class="tab-pane fade"
                      role="tabpanel"
                    >
                      <h4 class="card-title d-flex justify-content-between">
                        <span>Time Slots</span>
                        <a
                          class="edit-link"
                          data-bs-toggle="modal"
                          href="#add_time_slot"
                        >
                          <i class="fa fa-plus-circle"></i> Add Slot
                        </a>
                      </h4>
                      <p class="text-muted mb-0">Not Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default DoctorProfile;
