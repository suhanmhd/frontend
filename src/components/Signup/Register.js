import React, { useState, useEffect } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCardFooter,
  MDBValidation,
  MDBBtn,
  MDBIcon,
  MDBSpinner,
  MDBValidationItem,
  MDBDropdown,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userRegister } from "../../axios/services/HomeServices";
const initialState = {
  firstname: "",
  lastname: "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { firstname, lastname, name, gender, age, email, password, confirmPassword } =
    formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Password does not match");
    }
    if (
      firstname &&
      lastname &&
      name&&
      gender &&
      age &&
      email &&
      password &&
      confirmPassword
    ) {
      dispatch(userRegister({ formValue, navigate, toast }));
    }
  };
  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  return (
    <div
      style={{
        margin: "auto",
        // padding: "15px",
        maxWidth: "600px",
        alignContent: "center",
        // marginTop: "50px",
      }}
    >
      <MDBCard alignment="center">
        <MDBIcon fas icon="user-circle" className="fa-5x p-4" />
        <h4> USER REGISTRATION </h4>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className="row g-3">
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
                />
              </div>
            </MDBValidationItem>

            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your username"
              invalid
            >
              <div className="col-md-12">
                <MDBInput
                  label="Username"
                  type="text"
                  value={name}
                  name="name"
                  onChange={onInputChange}
                  required
                  invalid
                  />
                </div>
              </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your gender"
              invalid
            >
              <div className="col-md-12">
                <MDBDropdown>
                  {/* <label for="Specialization">Specialization</label> */}
                  <select
                    class="form-select"
                    name="gender"
                    area-label="Default select example"
                    onChange={onInputChange}
                  >
                    <option value="" disabled selected>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </MDBDropdown>
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
                />
              </div>
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please provide your password"
              invalid
            >
              <div className="col-md-12">
                <MDBInput
                  label="Password"
                  type="password"
                  value={password}
                  name="password"
                  onChange={onInputChange}
                  required
                  invalid
                />
              </div>
            </MDBValidationItem>
            <MDBValidationItem
              className="col-md-12"
              feedback="Please confirm your password"
              invalid
            >
              <div className="col-md-12">
                <MDBInput
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  name="confirmPassword"
                  onChange={onInputChange}
                  required
                  invalid
                />
              </div>
            </MDBValidationItem>
            <div className="col-12">
              <MDBBtn style={{ width: "100%" }} className="mt-2">
                {loading && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Sign Up
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/login">
            <p>Already have an account? Login here</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Register;
