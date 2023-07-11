import React, { useEffect, useState } from "react";
import { getAllDetails } from "../../../axios/services/AdminServices";
// import { CardsData } from '../../../Data/Data'
import Card from "../Card/Card";
import "./Cards.css";
import {
  UilUsersAlt,
  UilUsdSquare,
  UilMoneyWithdrawal,
} from "@iconscout/react-unicons";

const Cards = () => {
  const [allDetails, setAllDetails] = useState("");
  const token = JSON.parse(localStorage.getItem("admin"))?.token;

  const fetchData = async () => {
    let details = [];
    details = await getAllDetails(token);
    console.log(details);
    setAllDetails(details);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="Cards">
      {/* {CardsData.map((card, id) => { */}
      {/* return ( */}
      <div className="parentContainer">
        <Card
          title="Total Revenue"
          color={{
            backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
          }}
          barValue="70"
          value={allDetails.totalRevenue}
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
          title="Total Users"
          color={{
            backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
          }}
          barValue="60"
          value={allDetails.totalUsers}
          png={UilUsersAlt}
          series={[
            {
              name: "Users",
              data: [10, 100, 50, 70, 80, 30, 40],
            },
          ]}
        />
      </div>

      <div className="parentContainer">
        <Card
          title="Total Doctors"
          color={{
            backGround:
              "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
          }}
          barValue="80"
          value={allDetails.totalDoctors}
          png={UilUsersAlt}
          series={[
            {
              name: "Doctors",
              data: [10, 25, 15, 30, 12, 15, 20],
            },
          ]}
        />
      </div>
      {/* ); */}
      {/* })} */}
    </div>
  );
};

export default Cards;
