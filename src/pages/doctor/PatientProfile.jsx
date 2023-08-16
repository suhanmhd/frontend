import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getUserAppointmentDetailsToDoctor,
  getUserById,
} from "../../axios/services/DoctorServices";
import PatientProfileLayout from "../../components/Doctor/PatientProfileLayout";

const PatientProfile = () => {
  const [userAppointments, setUserAppointments] = useState([]);

  const token = JSON.parse(localStorage.getItem("doctor")).token;
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { userAppointments } = await getUserAppointmentDetailsToDoctor(
        token,
        id
      );
      //   setUserDetails(userDetails);
      setUserAppointments(userAppointments);
    };

    fetchData();
  }, []);

  return (
    <PatientProfileLayout>
      <div class="card">
        <div class="card-body pt-0">
          <div class="user-tabs">
            <ul class="nav nav-tabs nav-tabs-bottom nav-justified flex-wrap">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  href="#pat_appointments"
                  data-toggle="tab"
                >
                  Appointments
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#pres" data-toggle="tab">
                  <span>Prescription</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#medical" data-toggle="tab">
                  <span class="med-records">Medical Records</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="tab-content">
            <div id="pat_appointments" class="tab-pane fade show active">
              <div class="card card-table mb-0">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>Doctor</th>
                          <th>Appt Date</th>
                          <th>Approval</th>
                          <th>Payment status</th>
                          <th>Amount</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {userAppointments.map((appointment) => {
                          return (
                            <tr>
                              <td>
                                <h2 class="table-avatar">
                                  {appointment.userImage ? (
                                    <a
                                      //   href="doctor-profile.html"
                                      class="avatar avatar-sm mr-2"
                                    >
                                      <img
                                        class="avatar-img rounded-circle"
                                        src={appointment.userImage}
                                        alt="User"
                                      />
                                    </a>
                                  ) : (
                                    <a
                                      //   href="doctor-profile.html"
                                      class="avatar avatar-sm mr-2"
                                    >
                                      <img
                                        class="avatar-img rounded-circle"
                                        src="https://cdn3.vectorstock.com/i/1000x1000/78/32/male-doctor-with-stethoscope-avatar-vector-31657832.jpg"
                                        alt="User"
                                      />
                                    </a>
                                  )}
                                  <a
                                  //   href="doctor-profile.html"
                                  >
                                    Dr. {appointment.doctorInfo}
                                    {/* <span>Dental</span> */}
                                  </a>
                                </h2>
                              </td>
                              <td>
                                {appointment.date}{" "}
                                <span class="d-block text-info">
                                  {appointment.time}
                                </span>
                              </td>
                              <td>{appointment.status}</td>
                              <td>{appointment.paymentStatus}</td>
                              <td>Rs. {appointment.amount}</td>
                              {/* <td>
                                        <span class="badge badge-pill bg-success-light">
                                          Confirm
                                        </span>
                                      </td> */}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="pres">
              <div class="text-right">
                <Link to={`/add-prescription/${id}`}>
                  <a class="add-new-btn">
                    Add Prescription
                  </a>
                </Link>
              </div>
              <div class="card card-table mb-0">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>Date </th>
                          <th>Name</th>
                          <th>Created by </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>14 Nov 2019</td>
                          <td>Prescription 1</td>
                          <td>
                            <h2 class="table-avatar">
                              <a
                                href="doctor-profile.html"
                                class="avatar avatar-sm mr-2"
                              >
                                <img
                                  class="avatar-img rounded-circle"
                                  src="assets/img/doctors/doctor-thumb-01.jpg"
                                  alt="User Image"
                                />
                              </a>
                              <a href="doctor-profile.html">
                                Dr. Ruby Perrin <span>Dental</span>
                              </a>
                            </h2>
                          </td>
                          <td class="text-right">
                            <div class="table-action">
                              <a
                                href="javascript:void(0);"
                                class="btn btn-sm bg-primary-light"
                              >
                                <i class="fas fa-print"></i> Print
                              </a>
                              <a
                                href="javascript:void(0);"
                                class="btn btn-sm bg-info-light"
                              >
                                <i class="far fa-eye"></i> View
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div class="tab-pane fade" id="medical">
              <div class="text-right">
                <a
                  href="#"
                  class="add-new-btn"
                  data-toggle="modal"
                  data-target="#add_medical_records"
                >
                  Add Medical Records
                </a>
              </div>
              <div class="card card-table mb-0">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-hover table-center mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Date </th>
                          <th>Description</th>
                          <th>Attachment</th>
                          <th>Created</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <a href="javascript:void(0);">#MR-0010</a>
                          </td>
                          <td>14 Nov 2019</td>
                          <td>Dental Filling</td>
                          <td>
                            <a href="#">dental-test.pdf</a>
                          </td>
                          <td>
                            <h2 class="table-avatar">
                              <a
                                href="doctor-profile.html"
                                class="avatar avatar-sm mr-2"
                              >
                                <img
                                  class="avatar-img rounded-circle"
                                  src="assets/img/doctors/doctor-thumb-01.jpg"
                                  alt="User Image"
                                />
                              </a>
                              <a href="doctor-profile.html">
                                Dr. Ruby Perrin <span>Dental</span>
                              </a>
                            </h2>
                          </td>
                          <td class="text-right">
                            <div class="table-action">
                              <a
                                href="javascript:void(0);"
                                class="btn btn-sm bg-primary-light"
                              >
                                <i class="fas fa-print"></i> Print
                              </a>
                              <a
                                href="javascript:void(0);"
                                class="btn btn-sm bg-info-light"
                              >
                                <i class="far fa-eye"></i> View
                              </a>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PatientProfileLayout>
  );
};

export default PatientProfile;
