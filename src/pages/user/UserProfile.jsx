import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getUserProfile,
  updateUserProfile,
} from "../../axios/services/HomeServices";
import Navbar from "../../components/Navbar";
import { storage } from "../../firebaseConfig";

const UserProfile = () => {
  const navigate = useNavigate();
  const [imgstate, setImgstate] = useState(null)
  const [formValue, setFormValue] = useState([]);
  const user = localStorage.getItem("user");

  const { firstname, lastname, email, gender, age, image } = formValue;

  const userId = JSON.parse(localStorage.getItem("user")).userExists?.id;
  const token = JSON.parse(localStorage.getItem("user")).token;
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getUserProfile(token, userId);
      console.log(data)
      setFormValue(data.userProfile);
    };
    fetchData();
  }, [userId, token]);

  const handleSubmit = (e) => {e.preventDefault();
    storage.ref('/images/'+imgstate.name).put(imgstate)
    .then(({ref})=>{
      ref.getDownloadURL().then(async(url)=>{
      console.log(url);
      
      updateUserProfile({ ...formValue,image:url }, token);
    navigate("/");
    toast.success("Profile updated");
      })
   
  });


    
    // e.preventDefault();
    // console.log({...formValue});
    // updateUserProfile({ ...formValue }, token);
    // navigate("/");
    // toast.success("Profile updated");
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    // console.log(formValue);
  };

  return (
    
    <>
   
      
      <Navbar />

      <div
        className="heading"
        style={{ display: "flex", alignItems: "center" }}
      >
        <h2>YOUR PROFILE</h2>
      </div>
      
      {user && (
        <div
          style={{
            margin: "auto",
            // padding: "10px",
            maxWidth: "50%",
            alignContent: "center",
            marginTop: "50px",
          }}
        >

<div className="p-2">
        <h1>MANAGE YOUR PROFILE</h1>
      
        <div className="imgDiv">
            <img src={image} width="100" height="100" alt=""/>
        </div>
        <input type="file" 
        name="image"
        onChange={(e)=>setImgstate(e.target.files[0])}
        />
      </div>
          <MDBCard alignment="left">
            {/* <MDBIcon fas icon="user-circle" className="fa-5x" /> */}
            <MDBCardBody>
              <MDBValidation
                onSubmit={handleSubmit}
                noValidate
                className="row g-3"
              >
                <h4>Personal Details : </h4>
                <MDBValidationItem
                  className="col-md-6"
                  feedback="Please provide firstname"
                  invalid
                >
                  <div className="col-md-12">
                    <MDBInput
                      label="Firstname"
                      type="text"
                      value={firstname}
                      name="firstname"
                      onChange={onInputChange}
                      required
                      invalid
                      disabled
                    />
                  </div>
                </MDBValidationItem>
                <MDBValidationItem
                  className="col-md-6"
                  feedback="Please provide lastname"
                  invalid
                >
                  <div className="col-md-12">
                    <MDBInput
                      label="Lastname"
                      type="text"
                      value={lastname}
                      name="lastname"
                      onChange={onInputChange}
                      required
                      invalid
                      disabled
                    />
                  </div>
                </MDBValidationItem>
                <MDBValidationItem
                  className="col-md-12"
                  feedback="Please provide your email"
                  invalid
                >
                  <div className="col-md-12">
                    <MDBInput
                      label="Email"
                      type="email"
                      value={email}
                      name="email"
                      onChange={onInputChange}
                      required
                      invalid
                      disabled
                    />
                  </div>
                </MDBValidationItem>
                <MDBValidationItem
                  className="col-md-12"
                  feedback="Please provide your gender"
                  invalid
                >
                  <div className="col-md-12">
                    <MDBInput
                      label="Gender"
                      type="gender"
                      value={gender}
                      name="gender"
                      onChange={onInputChange}
                      required
                      invalid
                    />
                  </div>
                </MDBValidationItem>
                <MDBValidationItem
                  className="col-md-12"
                  feedback="Please provide your age"
                  invalid
                >
                  <div className="col-md-12">
                    <MDBInput
                      label="Age"
                      type="age"
                      value={age}
                      name="age"
                      onChange={onInputChange}
                      required
                      invalid
                    />
                  </div>
                </MDBValidationItem>
                <div className="col-12">
                  <MDBBtn style={{ width: "100%" }} className="mt-2">
                    UPDATE YOUR PROFILE
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
          </MDBCard>
        </div>
      )}


    </>
  );
};

export default UserProfile;
