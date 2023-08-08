import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { toast } from "react-toastify";
import {
  getAppointmentRequests,
  getTodaysAppointmentRequests,
  rejectFunction,
  updateStatus,
} from "../../axios/services/DoctorServices";
import Layout from "../../components/Doctor/Layout";

const AppointmentRequests = () => {
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const token = JSON.parse(localStorage.getItem("doctor")).token;

  const fetchData = async () => {
    const docId = JSON.parse(localStorage.getItem("doctor")).doctorExists?.id;
    const data = await getAppointmentRequests(token, docId);

    console.log(data);
    setAppointments(data.appointmentsDetails);
    // const todaysData = await getTodaysAppointmentRequests(token, docId);
    // setTodaysAppointments(todaysData.appointmentsDetails);
  };
  // console.log(todays);
  useEffect(() => {
    fetchData();
  }, []);

  console.log(appointments);

  const handleSelectChange = (event) => {
    setReason(event.target.value);
  };

  // function to handle appointment cancellation
  const reject = () => {
    setIsModalOpen(true);
  };

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



  const handleSubmit = async (e, row, status, reason) => {
    e.preventDefault();
    // You can do something with the selected reason here
    try {
      console.log(status);
      const response = await rejectFunction(
        { appointmentId: row.id, status, reason },
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
    console.log(row, status, reason);
    setIsModalOpen(false);
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

  // const columns = [
  //   {
  //     name: "Token number",
  //     selector: (row) => row.id,
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
  //     name: "Status",
  //     selector: (row) => row.status,
  //   },
  //   {
  //     name: "Payment",
  //     selector: (row) => row.paymentStatus,
  //   },
  //   {
  //     name: "Action",
  //     selector: (row) => {
  //       return (
  //         <div>
  //           {" "}
  //           {row.status === "pending" ? (
  //             <>
  //               <button
  //                 className="btn btn-success"
  //                 onClick={() => handleStatus(row, "approved")}
  //               >
  //                 <i class="fa-solid fa-check"></i>
  //               </button>
  //               <button className="btn btn-danger" onClick={reject}>
  //                 <i class="fa-solid fa-xmark"></i>
  //               </button>

  //               <Modal isOpen={isModalOpen} style={customStyles}>
  //                 <h2>Reason for Rejection</h2>
  //                 <form
  //                   onSubmit={(e) => handleSubmit(e, row, "rejected", reason)}
  //                 >
  //                   <div>
  //                     <label>
  //                       <input
  //                         type="radio"
  //                         value="doctor unavailability"
  //                         checked={reason === "doctor unavailability"}
  //                         onChange={handleSelectChange}
  //                       />
  //                       Doctor unavailability
  //                     </label>
  //                   </div>
  //                   <div>
  //                     <label>
  //                       <input
  //                         type="radio"
  //                         value="inappropriate timing"
  //                         checked={reason === "inappropriate timing"}
  //                         onChange={handleSelectChange}
  //                       />
  //                       Inappropriate timing
  //                     </label>
  //                   </div>
  //                   <div>
  //                     <label>
  //                       <input
  //                         type="radio"
  //                         value="irrelevant information"
  //                         checked={reason === "irrelevant information"}
  //                         onChange={handleSelectChange}
  //                       />
  //                       Irrelevant information
  //                     </label>
  //                   </div>
  //                   <button type="submit" style={buttonStyles}>
  //                     REJECT
  //                   </button>
  //                 </form>
  //                 <button
  //                   onClick={() => setIsModalOpen(false)}
  //                   style={buttonStyles1}
  //                 >
  //                   GO BACK
  //                 </button>
  //               </Modal>
  //             </>
  //           ) : (
  //             <>
  //               <button
  //                 className="btn btn-success"
  //                 disabled
  //                 onClick={() => handleStatus(row, "approved")}
  //               >
  //                 <i class="fa-solid fa-check"></i>
  //               </button>
  //               <button
  //                 className="btn btn-danger"
  //                 disabled
  //                 onClick={() => handleStatus(row, "rejected")}
  //               >
  //                 <i class="fa-solid fa-xmark"></i>
  //               </button>
  //             </>
  //           )}
  //         </div>
  //       );
  //     },
  //   },
  // ];

  return (
    <Layout>
      <div className="p-2">
        <h1>APPOINTMENT REQUESTS</h1>
      </div>

      <div className="container">
        <div className="row ml-3">
          <h5>Todays Appointments</h5>
        </div>
        {/* <!-- Page Content --> */}
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12 col-lg-12 col-xl-12">
                <div class="appointments">
                  {todaysAppointments?.map((todaysAppointment) => (
                    <Appointment appoinment={todaysAppointment} handleStatus={handleStatus}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Page Content --> */}
      </div>

      <div className="container">
        <div className="row ml-3 mt-2">
          <h5>Appointment History</h5>
        </div>
        {/* <!-- Page Content --> */}
        <div class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12 col-lg-12 col-xl-12">
                <div class="appointments">
                  {appointments?.map((appoinment) => (
                    <Appointment appoinment={appoinment} handleStatus={handleStatus} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- /Page Content --> */}
      </div>
    </Layout>
  );
};

function Appointment({ appoinment, handleStatus }) {
  return (
    <>
      {/* <!-- Appointment List --> */}
      <div class="appointment-list">
        <div class="profile-info-widget">
          <a href="patient-profile.html" class="booking-doc-img">
            <img src="/assets/img/patients/patient.jpg" alt="User Image" />
          </a>
          <div class="profile-det-info">
            <h3>
              <a href="patient-profile.html">{appoinment.userInfo}</a>
            </h3>
            <div class="patient-details">
              <h5>
                <i class="far fa-clock"></i> 14 Nov 2019, 10.00 AM
              </h5>
              <h5>
                <i class="fas fa-map-marker-alt"></i> Newyork, United States
              </h5>
              <h5>
                <i class="fas fa-envelope"></i> richard@example.com
              </h5>
              <h5 class="mb-0">
                <i class="fas fa-phone"></i> +1 923 782 4575
              </h5>
            </div>
          </div>
        </div>
        <div class="appointment-action">
          {appoinment.status === "pending" && (
            <>
              <button onClick={()=>handleStatus(appoinment,"approved")} class="btn btn-sm bg-success-light">
                <i class="fas fa-check"></i> Accept
              </button>

              <button onClick={() => handleStatus(appoinment, "rejected")} class="btn btn-sm bg-danger-light">
                <i class="fas fa-times"></i> Cancel
              </button>
            </>
          ) }
        </div>
      </div>
      {/* <!-- /Appointment List --> */}
    </>
  );
}

export default AppointmentRequests;
