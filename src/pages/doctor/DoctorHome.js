import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getMyPaidAppointments } from "../../axios/services/DoctorServices";
import DoctorCards from "../../components/Doctor/DoctorHome/DoctorCards/DoctorCards";
import Layout from "../../components/Doctor/Layout";

const DoctorHome = () => {
  const [paidAppointments, setPaidAppointments] = useState("");
  const token = JSON.parse(localStorage.getItem("doctor"))?.token;
  const docId = JSON.parse(localStorage.getItem("doctor"))?.doctorExists?._id;

  const fetchData = async () => {
    const data = await getMyPaidAppointments(token, docId);
    setPaidAppointments(data.paidAppointments);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(paidAppointments);

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
          <h4 class="my-4 ms-2">Patient Appoinment</h4>

          <>
            {/* <!-- Appointment Tab  */}
            <ul class="nav nav-tabs nav-tabs-solid nav-tabs-rounded">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  href="#upcoming-appointments"
                  data-toggle="tab"
                >
                  Upcoming
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
            {/* /Appointment Tab */}

            <div class="tab-content">
              {/* Upcoming Appointment Tab  */}
              <div class="tab-pane show active" id="upcoming-appointments">
                <div class="card card-table mb-0">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Patient Name</th>
                            <th>Appt Date</th>
                            <th>Purpose</th>
                            <th>Type</th>
                            <th class="text-center">Paid Amount</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={5}>
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
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Upcoming Appointment Tab  */}

              {/* Today Appointment Tab  */}
              <div class="tab-pane" id="today-appointments">
                <div class="card card-table mb-0">
                  <div class="card-body">
                    <div class="table-responsive">
                      <table class="table table-hover table-center mb-0">
                        <thead>
                          <tr>
                            <th>Patient Name</th>
                            <th>Appt Date</th>
                            <th>Purpose</th>
                            <th>Type</th>
                            <th class="text-center">Paid Amount</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td colSpan={5}>
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
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorHome;
