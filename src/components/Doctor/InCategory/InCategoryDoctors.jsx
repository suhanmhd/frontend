import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoctorByCategory } from "../../../axios/services/DoctorServices";
import DoctorCard from "./DoctorCard";
import "./InCategoryDoctors.css";

const InCategoryDoctors = () => {

  const { departmentName } = useParams();
  console.log({departmentName});

  const [InCatDoc, setInCatDoc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // const token = localStorage.getItem("user");
      const data = await getDoctorByCategory(departmentName);
      setInCatDoc(data.doctorDetails);
    };
    fetchData();
  }, [departmentName]);

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          {/* <div className="heading">
            <p>DENTIST</p>
          </div> */}

          <div className="heading">
            <p>Introducing The Industry Experts In This Field</p>
          </div>
        </div>
      </div>
      <div className="card-main">
        <div className="card-container1">
          {InCatDoc &&
            InCatDoc.map((item) => {
              return <DoctorCard key={item.id} doctor={item} />;
            })}
        </div>
      </div>
    </>
  );
};

export default InCategoryDoctors;
