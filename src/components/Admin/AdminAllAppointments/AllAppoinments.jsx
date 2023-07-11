import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { getAllAppointments } from "../../../axios/services/AdminServices";
import { updateStatus } from "../../../axios/services/DoctorServices";

const AllAppoinments = () => {
  const [appointments, setAppointments] = useState([]);
  const token = JSON.parse(localStorage.getItem("admin")).token;

  const fetchData = async () => {
    const data = await getAllAppointments(token);
    setAppointments(data.allAppointments);
    console.log(appointments);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (row, status) => {
    try {
      console.log(status);
      const response = await updateStatus(
        { appointmentId: row._id, status },
        token
      );
      console.log(response);
      if (response.status) {
        toast.success(response.message);
        fetchData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const columns = [
    {
      name: "Doctor name",
      selector: (row) => row.doctorInfo,
    },
    {
      name: "Patient name",
      selector: (row) => row.userInfo,
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
      name: "Approval",
      selector: (row) => row.status,
    },
    {
      name: "Payment Status",
      selector: (row) => row.paymentStatus,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Action",
      selector: (row) => {
        return (
          <div>
            {" "}
            {row.status === "pending" ? (
              <button
                className="btn btn-danger"
                onClick={() => handleSubmit(row, "cancelled")}
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
  ];

  return (
    <>
      {" "}
      <div className="container">
        <div className="row mt-4">
          <h1> ALL APPOINTMENTS </h1>
        </div>
        <DataTable
          columns={columns}
          data={appointments}
          fixedHeader
          fixedHeaderScrollHeight="700px"
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          pagination
        />
      </div>
    </>
  );
};

export default AllAppoinments;
