import React, { useEffect, useState } from "react";
import { getDoctorDashDetails } from "../../../../axios/services/DoctorServices";
import Card from "../../../Admin/Card/Card";
import "./DoctorCards.css";
import {
  UilUsersAlt,
  UilUsdSquare,
  UilMoneyWithdrawal,
} from "@iconscout/react-unicons";

const DoctorCards = () => {
  const [dashDetails, setDashDetails] = useState("");
  const token = JSON.parse(localStorage.getItem("doctor"))?.token;
  const docId = JSON.parse(localStorage.getItem("doctor"))?.doctorExists?._id;

  const fetchData = async () => {
    const doctorDashDetails = await getDoctorDashDetails(token, docId);
    setDashDetails(doctorDashDetails);
  };

  console.log(dashDetails);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="Cards">
      {/* {CardsData.map((card, id) => { */}
      {/* return ( */}
      <div className="parentContainer">
        <Card
          title="Total Appointments"
          color={{
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          }}
          barValue="70"
          value={dashDetails.totalAppointments}
          png={UilUsdSquare}
          series={[
            {
              name: "Revenue",
              data: [31, 40, 28, 51, 42, 109, 100],
            },
          ]}
        />
      </div>


      <div className="parentContainer">
            <Card
              title="Pending Approval"
              color={{
                backGround:
                  "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
                boxShadow: "0px 10px 20px 0px #F9D59B",
              }}
              barValue="80"
              value={dashDetails.pendingAppointments}
              png={UilUsersAlt}
              series={[
                {
                  name: "Doctors",
                  data: [10, 25, 15, 30, 12, 15, 20],
                },
              ]}
            />
          </div>
          

      <div className="parentContainer">
        <Card
          title="Total Revenue"
          color={{
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
          }}
          barValue="60"
          value={dashDetails.totalRevenue}
          png={UilUsersAlt}
          series={[
            {
              name: "Users",
              data: [10, 100, 50, 70, 80, 30, 40],
            },
          ]}
        />
      </div>


      {/* })} */}
    </div>
  );
};

export default DoctorCards;
