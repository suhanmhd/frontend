import React, { useEffect, useState } from "react";
import "./FindDoctor.css";
import { useNavigate } from "react-router-dom";
import FindDoctorBanner from "./FindDoctorBanner";
import UserLayout from "../../User/UserLayout";
import { getAllDoctors } from "../../../axios/services/HomeServices";
import DoctorCard from "../InCategory/DoctorCard";

const FindDoctor = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    const data = await getAllDoctors();
    if (data) {
      console.log(data);
      setAllDoctors(data.doctorDetails);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <UserLayout>
        {allDoctors &&
          allDoctors.map((doctor) => {
            return <DoctorCard doctor={doctor} />;
          })}
      </UserLayout>
    </>
  );
};

export default FindDoctor;
