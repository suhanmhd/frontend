import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { getMyPaidAppointments } from '../../axios/services/DoctorServices';
import DoctorCards from '../../components/Doctor/DoctorHome/DoctorCards/DoctorCards';
import Layout from '../../components/Doctor/Layout'

const DoctorHome = () => {

  const [paidAppointments, setPaidAppointments] = useState("")
  const token = JSON.parse(localStorage.getItem('doctor'))?.token
  const docId = JSON.parse(localStorage.getItem('doctor'))?.doctorExists?._id;

  const fetchData = async() => {
    const data = await getMyPaidAppointments(token, docId)
    setPaidAppointments(data.paidAppointments)
  }

  useEffect(() => {
    fetchData();
  }, [])
  
  console.log(paidAppointments)

  const columns = [
    {
      name: "Token number",
      selector: (row) => row._id,
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
      name: "Approval status",
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
  ];

  return (
    <Layout>
        <>
    {" "}
    <div className="container">
      <div className="row mt-4">
      <h1>MY DASHBOARD</h1>
      </div>
    <div className="MainDash">
      <DoctorCards />
      <div className="Table">
      <h3>Paid Appointments</h3>

      <DataTable
        columns={columns}
        data={paidAppointments}
        fixedHeader
        fixedHeaderScrollHeight="700px"
        selectableRows
        selectableRowsHighlight
        highlightOnHover
        pagination
      />
      </div>
    </div>
    </div>
    </>
    </Layout>
  )
}

export default DoctorHome