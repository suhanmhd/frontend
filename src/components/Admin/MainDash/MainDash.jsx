import React, { useEffect, useRef, useState } from "react";
import Cards from "../Cards/Cards";
import CardDashboard from "../CardDashboard";
import "../MainDash/MainDash.css";
import "../Table/Table.css";
import Datatable from "react-data-table-component";
import {
  getAllDetails,
  getPaidAppointments,
} from "../../../axios/services/AdminServices";
import { groupBy } from "lodash";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import BarChart from "../BarChart";
import { Pie } from 'react-chartjs-2';

const MainDash = () => {
  const tableRef = useRef(null);

  const [paidAppointments, setPaidAppointments] = useState("");
  const [details, setDetails] = useState([]);
  const token = JSON.parse(localStorage.getItem("admin")).token;

  const fetchData = async () => {
    // const allPaidAppointments = await getPaidAppointments(token);
    const allDetails = await getAllDetails(token);
    // console.log(allPaidAppointments);
    // setPaidAppointments(allPaidAppointments.paidAppointments);
    setDetails(allDetails);
  };
  console.log(details);

  useEffect(() => {
    fetchData();
  }, []);

  const createdAtDates = details?.createdDate;
  const totalAmounts = details?.totalAmount;

  const barData = {
    labels: createdAtDates?.map((date) =>
      new Date(date).toISOString().substr(0, 10)
    ),
    datasets: [
      {
        label: "Total Amount",
        data: totalAmounts,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const pieData = {
    labels: ['Users', 'Doctors', 'Appointments'],
    datasets: [
      {
        data: [details?.numUsers, details?.numDoctors, details?.numBookings],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };
  

  const doctorDetails = Object.entries(
    groupBy(details?.bookingDetails, "doctorInfo")
  ).reduce((result, [doctorInfo, bookings]) => {
    const number = bookings.length;
    const amount = bookings.reduce((total, { amount }) => total + amount, 0);
    result.push({ doctorInfo, number, amount });
    return result;
  }, []);

  console.log(doctorDetails);

  const columns = [
    {
      name: "No",
      selector: (row, i) => i + 1,
    },
    {
      name: "Doctor Name",
      selector: (row) => row?.doctorInfo
    },
    {
      name: "No. of bookings",
      selector: (row) => row?.number
    },
    {
      name: "Amount in Rs.",
      selector: (row) => row?.amount
    },
  ]

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Booking Details", 80, 10);

    const tableColumn = columns.map((column) => column.name);
    const tableRows = doctorDetails.map((row, index) => {
      const rowData = [index + 1, row?.doctorInfo, row?.number, row?.amount];
      return rowData;
    });

    // Add the table to the PDF document
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      foot: [
        [
          "",
          "",
          "Grand Total",
          doctorDetails.reduce((total, row) => total + row.amount, 0),
        ],
      ],
    });

    doc.save("table.pdf");
  };

  const grandTotal = doctorDetails.reduce(
    (total, { amount }) => total + amount,
    0
  );
  console.log(grandTotal);

  return (
    <>
      {" "}
      <div className="container">
        <div className="row mt-4">
          <h1>DASHBOARD</h1>
        </div>


          {/* <h3 className="text-center">Bookings Chart </h3> */}
        <div className="text-center m-3 d-flex flex-direction-row" style={{ width: "500px" }}>
        <CardDashboard
            data={`Total Revenue : Rs. ${details?.bookingTotal}`}
          />
          <Pie data={pieData} options={options} />
          <BarChart chartData={barData} />
        </div>
        {/* <h3>Paid Appointments</h3> */}
        <Datatable
          columns={columns}
          data={doctorDetails}
          fixedHeader
          // fixedHeaderScrollHeight="300px"
          selectableRows
          selectableRowsHighlight
          highlightOnHover
          ref={tableRef}
          actions={
            <button className="btn btn-dark" onClick={generatePDF}>
              Export
            </button>
          }
          pagination
          subHeaderComponent={
            <div className="text-danger">Total Amount: ₹ {grandTotal}</div>
          }
        />
      </div>
    </>
  );
};

export default MainDash;
