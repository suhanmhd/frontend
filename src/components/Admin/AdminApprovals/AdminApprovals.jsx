import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import {
  pendingApprovals,
  approve,
} from "../../../axios/services/AdminServices";

const AdminApprovals = () => {
  const [approvals, setApprovals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");
  const token = JSON.parse(localStorage.getItem("admin")).token;

  const fetchData = async () => {
    const data = await pendingApprovals(token);
    setApprovals(data.approvalDetails);
  };

  const handleSelectChange = (event) => {
    setReason(event.target.value);
  };

  // function to handle appointment cancellation
  const reject = () => {
    setIsModalOpen(true);
  };

  const Approve = async (row, status) => {
    console.log(row, status);
    const data = await approve({ id: row.id, status }, token);
    if (data) {
      fetchData();
    
    }
  };

  const handleSubmit = async(e, row, status, reason) => {
    e.preventDefault();
    console.log(row, status, reason)
    const data = await approve({ id: row.id, status, reason }, token);
    if (data) {
      fetchData();
   
    }
  }

  useEffect(() => {
    fetchData();
   
  }, []);

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
      name: "Name",
      selector: (row) => row.firstname + "  " + row.lastname,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "License Number",
      selector: (row) => row.license,
    },
    {
      name: "Specialization",
      selector: (row) => row.specialization,
    },
    {
      name: "Experience (years)",
      selector: (row) => row.experience,
    },
    {
      name: "Fees (in rupees)",
      selector: (row) => row.feesPerConsultation,
    },
    {
      name: "Timings",
      selector: (row) => row.timings,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div>
            {" "}
            {/* {row.isApproved} */}
            <button
              className="btn btn-success"
              onClick={() => Approve(row, "approved")}
            >
              <i class="fa-solid fa-check"></i>
            </button>
            <button className="btn btn-danger" onClick={reject}>
              <i class="fa-solid fa-xmark"></i>
            </button>
            <Modal isOpen={isModalOpen} style={customStyles}>
              <h2>Reason for Rejection</h2>
              <form onSubmit={(e) => handleSubmit(e, row, "rejected", reason)}>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="inappropriate details"
                      checked={reason === "inappropriate details"}
                      onChange={handleSelectChange}
                    />
                    Inappropriate details
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="invalid license"
                      checked={reason === "invalid license"}
                      onChange={handleSelectChange}
                    />
                    Invalid license
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="mismatching job profile"
                      checked={reason === "mismatching job profile"}
                      onChange={handleSelectChange}
                    />
                    Mismatching job profile
                  </label>
                </div>
                <button type="submit" style={buttonStyles}>
                  REJECT
                </button>
              </form>
              <button
                onClick={() => setIsModalOpen(false)}
                style={buttonStyles1}
              >
                GO BACK
              </button>
            </Modal>
          </div>
        );
      },
    },
  ];

  return (
    <div className="container">
      <div className="row mt-4">
        <h1> PENDING APPROVALS </h1>
      </div>
      <DataTable
        columns={columns}
        data={approvals}
        // fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        pagination
      />
    </div>
  );
};

export default AdminApprovals;
