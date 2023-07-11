import React, { useEffect, useState } from "react";
import "./FindDoctor.css";
import { useNavigate } from "react-router-dom";
import FindDoctorBanner from "./FindDoctorBanner";
import { getCategory } from "../../../axios/services/AdminServices";

const FindDoctor = () => {

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const fetchData = async () => {
    const data = await getCategory();
    setCategories(data.categoryDetails);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <FindDoctorBanner />
      <div className="doc-categories-main">
        {categories.map((item) => {
          return (
            <div
              className="doc-categories"
              onClick={() => navigate(`/view-doctors/${item.departmentName}`)}
            >
              <p>{item.departmentName}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FindDoctor;
