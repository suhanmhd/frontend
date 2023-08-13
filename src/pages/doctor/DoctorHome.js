import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  getAppointmentRequests,
  getMyPaidAppointments,
  getTodaysAppointmentRequests,
  updateStatus,
} from "../../axios/services/DoctorServices";
import DoctorCards from "../../components/Doctor/DoctorHome/DoctorCards/DoctorCards";
import Layout from "../../components/Doctor/Layout";
import { toast } from "react-toastify";

const DoctorHome = () => {
  const [appointments, setAppointments] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [reason, setReason] = useState("");
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const token = JSON.parse(localStorage.getItem("doctor")).token;

  console.log(todaysAppointments);

  const fetchData = async () => {
    const docId = JSON.parse(localStorage.getItem("doctor")).doctorExists?.id;
    const data = await getAppointmentRequests(token, docId);

    console.log(data);
    setAppointments(data.appointmentsDetails);
    const todaysData = await getTodaysAppointmentRequests(token, docId);
    setTodaysAppointments(todaysData.appointmentsDetails);
  };
  // console.log(todays);
  useEffect(() => {
    fetchData();
  }, []);

  const handleStatus = async (row, status) => {
    try {
      console.log(status);
      const response = await updateStatus(
        { appointmentId: row.id, status },
        token
      );
      console.log(response);
      if (response) {
        toast.success(response.message);
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // const columns = [
  //   {
  //     name: "Token number",
  //     selector: (row) => row._id,
  //   },
  //   {
  //     name: "Date",
  //     selector: (row) => row.date,
  //   },
  //   {
  //     name: "Time",
  //     selector: (row) => row.time,
  //   },
  //   {
  //     name: "Approval status",
  //     selector: (row) => row.status,
  //   },
  //   {
  //     name: "Payment Status",
  //     selector: (row) => row.paymentStatus,
  //   },
  //   {
  //     name: "Amount",
  //     selector: (row) => row.amount,
  //   },
  // ];

  return (
    <Layout>
      <div class="row">
        <div class="col-md-12">
          <div class="card dash-card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-lg-12">
                  <DoctorCards />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <h4 class="mb-4">Patient Appoinment</h4>
          <div class="appointment-tab">
            <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  href="#upcoming-appointments"
                  data-toggle="tab"
                >
                  All appointments
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="#today-appointments"
                  data-toggle="tab"
                >
                  Today
                </a>
              </li>
            </ul>

            <div class="tab-content">
              <div class="tab-pane show active" id="upcoming-appointments">
                <div class="card card-table mb-0">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Patient Name</th>
                            <th>Appt Date</th>
                            <th>Approval</th>
                            <th>Payment</th>
                            <th class="text-center">Paid Amount</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((appointment) => {
                            return (
                              <tr>
                                <td>
                                  <h2 class="table-avatar">
                                    <a
                                      href="patient-profile.html"
                                      class="avatar avatar-sm mr-2"
                                    >
                                      {appointment.userImage ? (
                                        <img
                                          class="avatar-img rounded-circle"
                                          src={appointment.userImage}
                                          alt="User"
                                        />
                                      ) : (
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/patients/patient6.jpg"
                                          alt="User"
                                        />
                                      )}
                                    </a>
                                    <a href="patient-profile.html">
                                      {appointment.userInfo}
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
                                <td class="text-center">
                                  Rs. {appointment.amount}
                                </td>
                                <td class="text-right">
                                  <div class="table-action">
                                    {appointment.status === "pending" && (
                                      <>
                                        <button
                                          onClick={() =>
                                            handleStatus(
                                              appointment,
                                              "approved"
                                            )
                                          }
                                          class="btn btn-sm bg-success-light"
                                        >
                                          <i class="fas fa-check"></i> Accept
                                        </button>

                                        <button
                                          onClick={() =>
                                            handleStatus(
                                              appointment,
                                              "rejected"
                                            )
                                          }
                                          class="btn btn-sm bg-danger-light"
                                        >
                                          <i class="fas fa-times"></i> Cancel
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="today-appointments">
                <div class="card card-table mb-0">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Patient Name</th>
                            <th>Appt Date</th>
                            <th>Approval</th>
                            <th>Payment</th>
                            <th class="text-center">Paid Amount</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {todaysAppointments?.map((appointment) => {
                            return (
                              <tr>
                                <td>
                                  <h2 class="table-avatar">
                                    <a
                                      href="patient-profile.html"
                                      class="avatar avatar-sm mr-2"
                                    >
                                      {appointment.userImage ? (
                                        <img
                                          class="avatar-img rounded-circle"
                                          src={appointment.userImage}
                                          alt="User"
                                        />
                                      ) : (
                                        <img
                                          class="avatar-img rounded-circle"
                                          src="assets/img/patients/patient.jpg"
                                          alt="User"
                                        />
                                      )}
                                    </a>
                                    <a href="patient-profile.html">
                                      {appointment.userInfo}
                                      {/* <span>#PT0016</span> */}
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
                                <td class="text-center">
                                  Rs. {appointment.amount}
                                </td>
                                <td class="text-right">
                                <div class="table-action">
                                    {appointment.status === "pending" && (
                                      <>
                                        <button
                                          onClick={() =>
                                            handleStatus(
                                              appointment,
                                              "approved"
                                            )
                                          }
                                          class="btn btn-sm bg-success-light"
                                        >
                                          <i class="fas fa-check"></i> Accept
                                        </button>

                                        <button
                                          onClick={() =>
                                            handleStatus(
                                              appointment,
                                              "rejected"
                                            )
                                          }
                                          class="btn btn-sm bg-danger-light"
                                        >
                                          <i class="fas fa-times"></i> Cancel
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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

export default DoctorHome;
