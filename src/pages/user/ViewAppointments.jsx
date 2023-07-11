import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import {
  cancelAppointment,
  // cancelAppointment,
  getUserAppointments,
} from "../../axios/services/HomeServices";
import Navbar from "../../components/Navbar";
import Modal from "react-modal";

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem("user")).token;
  const userId = JSON.parse(localStorage.getItem("user")).userExists.id;

  const fetchData = async () => {
    console.log(userId);
    const data = await getUserAppointments(token, userId);
    setAppointments(data.appointmentsDetails);
  };

  useEffect(() => {
    fetchData();
    fetchData();
    fetchData();
    fetchData();
  }, []);
  

  console.log(appointments);

  // function to handle appointment cancellation
  const cancel = () => {
    setIsModalOpen(true);
  };

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
        // fetchData();
        // fetchData();
        // fetchData();
        fetchData();
        toast.success(response.response);

       
        setIsModalOpen(false);
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
            {row.status === "pending"?(
              <button
                className="btn btn-success"
                onClick={() => confirmCancellation(row.id)}
              >
              CANCEL
              </button>
            ) : (
              <button className="btn btn-danger" disabled >
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
      <div className="container-fluid p-2">
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
      </div>
    </>
  );
};

export default ViewAppointments;
