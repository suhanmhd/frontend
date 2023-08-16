import React, { useEffect, useState, useRef } from "react";
// import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import {
  cancelAppointment,
  // cancelAppointment,
  getUserAppointments,
} from "../../axios/services/HomeServices";
import Navbar from "../../components/Navbar";
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
// import Modal from "react-modal";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const sock = useRef();
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [subscription, setSubscription] = useState(null);

  const token = JSON.parse(localStorage.getItem("user")).token;
  const userId = JSON.parse(localStorage.getItem("user")).userExists.id;
  // useEffect(() => {
  //   const connect = () => {
  //     sock.current = new SockJS("http://localhost:8088/ws");
  //     const temp = over(sock.current);
  //     setStompClient(temp);
  //     temp.connect({}, onConnect, onErr);
  //   };

  //   const onErr = (error) => {
  //     console.log("on Error", error);
  //   };

  //   const onConnect = () => {
  //     setConnected(true);
      
  //     const subscription = stompClient.subscribe(
  //       "/videocall/" + userId.toString(),
  //       onMessageRecive
  //     );
  //     setSubscription(subscription);
  //   };

  //   connect();

  //   return () => {
  //     stompClient?.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const connect = () => {
      sock.current = new SockJS("http://localhost:8088/ws");
      const temp = over(sock.current);
      setStompClient(temp);
      temp.connect({}, onConnect, onErr);
    };

    const onErr = (error) => {
      console.log("on Error", error);
    };

    const onConnect = () => {
      setConnected(true);
    };

    connect();

    return () => {
      stompClient?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (connected && stompClient) {
      console.log(connected, stompClient);

      const subscription = stompClient.subscribe(
        "/videocall/" + userId.toString(),
        onMessageRecive
      );
      console.log(subscription);

   
    }
  });
  const onMessageRecive = (payload) => {
    console.log("onMessageRecive ............. -----------", payload);

    console.log("recive message -  - - - - - - -  -", JSON.parse(payload.body));

    const recievedMessage = JSON.parse(payload.body);
    console.log(recievedMessage);

    setMessages([recievedMessage]);
  };

  console.log(userId);

  console.log(appointments);

  const navigateToLink = () => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage) {
      const link = latestMessage.text; // Assuming the link is in latestMessage.text
      window.open(link, "_blank"); // Open the link in a new tab/window
    }
  };

  const fetchData = async () => {
    console.log(userId);
    const data = await getUserAppointments(token, userId);
    setAppointments(data.appointmentsDetails);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(appointments);

  // function to handle appointment cancellation
  // const cancel = () => {
  //   setIsModalOpen(true);
  // };

  const confirmCancellation = async (id, status) => {
    try {
      console.log(status);
      console.log(id);
      const response = await cancelAppointment(
        { appointmentId: id, status },
        token
      );
      console.log(response);
      if (response) {
        fetchData();
        toast.success(response.response);
        // setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)",
      padding: "20px",
      backgroundColor: "lightblue",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center",
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#333",
    },
    button: {
      backgroundColor: "black",
    },
  };

  // custom styles for the buttons
  const buttonStyles = {
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "red",
  };

  // custom styles for the buttons
  const buttonStyles1 = {
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "green",
  };

  const columns = [
    {
      name: "Doctor name",
      selector: (row) => row.doctorInfo,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Time",
      selector: (row) => row.time,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Payment status",
      selector: (row) => row.paymentStatus,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Amount",
      selector: (row) => row.id,
    },

    //
    {
      name: "Block/Unblock",
      selector: (row) => {
        return (
          <div>
            {" "}
            {row.status === "pending" ? (
              <button
                className="btn btn-success"
                onClick={() => confirmCancellation(row.id)}
              >
                CANCEL
              </button>
            ) : (
              <button className="btn btn-danger" disabled>
                CANCEL
              </button>
            )}
          </div>
        );
      },
    },

    //

    // {
    //   name: "Action",
    //   selector: (row) => {

    //     return (
    //       <div>
    //         {" "}
    //         {row.status === "pending"? (
    //           <>
    //             <button className="btn btn-danger" onClick={cancel}>
    //               CANCEL
    //             </button>

    //             <Modal isOpen={isModalOpen} style={customStyles}>
    //               <h2>Are you sure you want to cancel this appointment?</h2>

    //               <button

    //                 onClick={() => confirmCancellation(row.id, "cancelled")}
    //                 style={buttonStyles}
    //               >
    //                 Yes, cancel
    //               </button>
    //               <button
    //                 onClick={() => setIsModalOpen(false)}
    //                 style={buttonStyles1}
    //               >
    //                 No, keep appointment
    //               </button>
    //             </Modal>
    //           </>
    //         ) : (
    //           <button className="btn btn-danger" disabled>
    //             CANCEL
    //           </button>
    //         )}
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <Navbar />
      {/* <div className="container-fluid p-2">
        <h1>MY APPOINTMENTS</h1>
      </div>
      <div className="container">
        <div className="row mt-5"></div>
        <DataTable
          columns={columns}
          data={appointments}
          // fixedHeader
          fixedHeaderScrollHeight="500px"
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          pagination
        />
      </div> */}

      <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-7 col-lg-8 col-xl-9">
              <div class="card">
                <div class="card-body pt-0">
                  <nav class="user-tabs mb-4">
                    <ul class="nav nav-tabs nav-tabs-bottom nav-justified">
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
                        <a
                          class="nav-link"
                          href="#pat_prescriptions"
                          data-toggle="tab"
                        >
                          Prescriptions
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          href="#pat_medical_records"
                          data-toggle="tab"
                        >
                          <span class="med-records">Medical Records</span>
                        </a>
                      </li>
                    </ul>
                  </nav>

                  <div class="tab-content pt-0">
                    <div
                      id="pat_appointments"
                      class="tab-pane fade show active"
                    >
                      <div class="card card-table mb-0">
                        <div class="card-body">
                          <div class="table-responsive">
                            <table class="table table-hover table-center mb-0">
                              <thead>
                                <tr>
                                  <th>Doctor</th>
                                  <th>Appt Date</th>
                                  {/* <th>Booking Date</th> */}
                                  <th>Amount</th>
                                  <th>Status</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {appointments &&
                                  appointments.map((appointment) => {
                                    return (
                                      <tr>
                                        <td>
                                          <h2 class="table-avatar">
                                            <a
                                              href="doctor-profile.html"
                                              class="avatar avatar-sm mr-2"
                                            >
                                              {/* ... (Avatar image) */}
                                            </a>
                                            <a href="doctor-profile.html">
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
                                        <td>Rs. {appointment.amount}</td>
                                        {appointment.status === "approved" ? (
                                          <td>
                                            <span class="badge badge-pill bg-success-light">
                                              approved
                                            </span>
                                          </td>
                                        ) : appointment.status ===
                                          "rejected" ? (
                                          <td>
                                            <span class="badge badge-pill bg-danger-light">
                                              rejected
                                            </span>
                                          </td>
                                        ) : (
                                          <td>
                                            <span class="badge badge-pill bg-primary-light">
                                              pending
                                            </span>
                                          </td>
                                        )}
                                        {appointment.status === "pending" && (
                                          <td class="text-right">
                                            <div class="table-action">
                                              <button
                                                onClick={() =>
                                                  confirmCancellation(
                                                    appointment.id
                                                  )
                                                }
                                                class="btn btn-sm bg-danger-light"
                                              >
                                                <i class="fas fa-times"></i>{" "}
                                                Cancel
                                              </button>
                                            </div>
                                          </td>
                                        )}
                                        {appointment.status === "approved" &&
                                          messages.length > 0 &&
                                          messages[messages.length - 1]
                                            .senderId === appointment.id && (
                                            <td class="text-right">
                                              <div class="table-action">
                                                <button
                                                  onClick={navigateToLink}
                                                  class="btn btn-sm bg-success-light"
                                                >
                                                  <i class="fas fa-video"></i>{" "}
                                                  Join Now
                                                </button>
                                              </div>
                                            </td>
                                          )}
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="tab-pane fade" id="pat_prescriptions">
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

                    <div id="pat_medical_records" class="tab-pane fade">
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
                                        class="btn btn-sm bg-info-light"
                                      >
                                        <i class="far fa-eye"></i> View
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        class="btn btn-sm bg-primary-light"
                                      >
                                        <i class="fas fa-print"></i> Print
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAppointments;
