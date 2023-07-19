import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../../axios/services/DoctorServices";
import Layout from "../../components/Doctor/Layout";

import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBSpinner,
  MDBValidationItem,
} from "mdb-react-ui-kit";

import { toast } from "react-toastify";
import { Input, TimePicker } from "antd";
import moment from "moment";
import { storage } from "../../firebaseConfig";

// const doctorProfile = {
//   id: "c7ba1801-9803-4283-b0ad-e470bfd16130",
//   username: "rajk",
//   firstname: "Raj",
//   lastname: "k",
//   email: "suhans@gmail.com",
//   name: "raj",
//   enabled: false,
//   isApproved: "approved",
//   timings: null,
//   specialization: "Dentist",
//   experience: "5",
//   about: `Dr. Emily Johnson is a highly skilled and experienced medical professional specializing in internal medicine. With a passion for providing comprehensive and compassionate care to her patients, Dr. Johnson has dedicated her career to improving the health and well-being of individuals.

//   After completing her medical degree at a prestigious medical school, Dr. Johnson pursued further training and specialization in internal medicine. She gained extensive clinical experience working at renowned hospitals and medical centers, honing her expertise in diagnosing and treating a wide range of medical conditions.`,
//   feesPerConsultation: 800,
//   license: "2323",
// };

const DoctorProfile = () => {
  const [imgstate, setImgstate] = useState(null);
  const [urlLink, setLink] = useState("");
  const [formValue, setFormValue] = useState({});
  // useState(doctorProfile)

  console.log(urlLink);

  const {
    username,
    firstname,
    lastname,
    email,
    experience,
    timings,
    about,
    feesPerConsultation,
    image,
  } = formValue;

  console.log(formValue);

  const timing = timings && [
    moment(timings[0], "h:mm a"),
    moment(timings[1], "h:mm a"),
  ];
  // const {doctor} = useSelector((state) => (state.doctor))
  const navigate = useNavigate();
  const doctor = JSON.parse(localStorage.getItem("doctor"));

  // const doctor = doctorProfile; // not need

  const { loading, error } = useSelector((state) => ({ ...state.doctor }));

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  // const { docId } = useParams();
  const { docId } = useParams();

  const token = JSON.parse(localStorage.getItem("doctor")).token;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDoctorProfile(token, docId);
      // const data = doctorProfile;
      setFormValue(data);
    };
    fetchData();
  }, []);

  timings && console.log(timings);

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateDoctorProfile({ ...formValue }, token);
    // updateDoctorProfile({ ...formValue });
    // navigate("/doctorHome");
    storage
      .ref("/images/" + imgstate.name)
      .put(imgstate)
      .then(({ ref }) => {
        ref.getDownloadURL().then(async (url) => {
          console.log(url);
          // updateDoctorProfile({ ...formValue });

          updateDoctorProfile({ ...formValue,image:url }, token);
          navigate("/doctorHome");
          toast.success("Profile updated");
        });
      });
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    console.log(formValue);
  };
  console.log(imgstate);

  return (
    <Layout>
      {/* start  */}
      <div class="profile-sidebar col-md-7 col-lg-8 col-xl-9">
        <div class="card">
          <div class="card-body">
          <MDBValidation
                  onSubmit={handleSubmit}
                  noValidate
                  className="row g-3"
                >
            <h4 class="card-title">Personal Information</h4>
            <div class="row form-row">
              <div class="col-md-12">
                <div class="form-group">
                  <div class="change-avatar">
                    <div class="profile-img">
                      <img src={image} alt="User Image" />
                    </div>
                    <div class="upload-img">
                      <div class="change-photo-btn">
                        <span>
                          <i class="fa fa-upload"></i> Upload Photo
                        </span>

                        <input
                          class="upload"
                          type="file"
                          name="image"
                          onChange={(e) => setImgstate(e.target.files[0])}
                        />
                      </div>
                      <small class="form-text text-muted">
                        Allowed JPG, GIF or PNG. Max size of 2MB
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <InputField
                  label="Username"
                  type="text"
                  value={username}
                  name="username"
                  onChange={onInputChange}
                  disabled
                ></InputField>
              </div>

              <div class="col-md-6">
                <InputField
                  label="First Name"
                  type="text"
                  value={firstname}
                  name="firstname"
                  onChange={onInputChange}
                  disabled
                ></InputField>
              </div>

              <div class="col-md-6">
                <InputField
                  label="Last Name"
                  type="text"
                  value={lastname}
                  name="lastname"
                  onChange={onInputChange}
                  disabled
                ></InputField>
              </div>
              <div class="col-md-6">
                <InputField
                  label="Email"
                  type="email"
                  value={email}
                  name="email"
                  onChange={onInputChange}
                  disabled
                ></InputField>
              </div>
            </div>
          </MDBValidation>

          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title">About Me</h4>
            <div class="form-group mb-0">
              <label>Biography</label>
              <textarea
                class="form-control"
                name="about"
                value={about}
                rows="5"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Professional Information</h4>
            <div class="row form-row">
              <div class="col-md-6">
                <InputField
                  label="Year of Experience"
                  type="text"
                  value={experience}
                  name="experience"
                  onChange={onInputChange}
                >
                  <span class="text-danger">*</span>
                </InputField>
              </div>

              <div class="col-md-6">
                <InputField
                  label="Fees per Consultation"
                  type="text"
                  value={feesPerConsultation}
                  name="feesPerConsultation"
                  onChange={onInputChange}
                >
                  <span class="text-danger">*</span>
                </InputField>
              </div>
            </div>
          </div>
        </div>
        <div class="submit-section submit-btn-bottom">
          <MDBBtn
            style={{ width: "100%" }}
            className="btn btn-primary submit-btn mt-2"
          >
            {loading && (
              <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            )}
            Save Changes
          </MDBBtn>
        </div>
      </div>
      {/* stop */}

      {/* <div className="p-2">
        <h1>MANAGE YOUR PROFILE</h1>

        <div className="imgDiv">
          <img src={image} alt="" />
        </div>

        <input
          type="file"
          name="image"
          onChange={(e) => setImgstate(e.target.files[0])}
        />
      </div> */}

    
    </Layout>
  );
};

const InputField = ({
  label,
  type = "text",
  value,
  children,
  name,
  onChange,
}) => {
  return (
    <div class="form-group">
      <label></label>
      <MDBValidationItem
        className="col-md-12"
        feedback="Please provide your experience"
        invalid
      >
        <div className="col-md-12">
          <MDBInput
            label={label}
            type={type}
            value={value}
            name={name}
            onChange={onChange}
            required
            invalid
          />
        </div>
      </MDBValidationItem>
    </div>
  );
};

const SelectField = ({ label, placeholder, options }) => {
  return (
    <div class="form-group">
      <select class="form-control select">
        <option value="">{placeholder}</option>
        {options.map((data) => (
          <option value={data.value} key={data.label}>
            {data.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DoctorProfile;
