import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Navbar from "../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setNewPassword, validateUser } from "../../axios/services/HomeServices";

const SetNewPassword = () => {

    const navigate = useNavigate();
    const params = useParams();

    const userId = params.userId
    const token = params.token

    const userValidation = async () => {
        const response = await validateUser(token, userId)
        if(response.status){
            console.log("Valid user")
        }else{
            toast.error("Token expired")
        }
    }

    useEffect(() => {
      userValidation();
    }, [])
    
    const handleSubmit = async (values, { setSubmitting }) => {
        const result = await setNewPassword(token, userId, {newPassword: values.password});
        if (result.status) {
            setSubmitting(false);
            navigate('/login')
        }else{
            toast.error(result.error)
        }
    }

    return (
    <>
      <Navbar />
      <Formik
        initialValues={{ password: "", cpassword: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.password) {
            errors.password = "Password is required";
          } else if (values.password.length < 5) {
            errors.password = "Password must be at least 5 characters long";
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/i.test(values.password)) {
            errors.password =
              "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character";
          }
          if (!values.cpassword) {
            errors.cpassword = "Confirm your password";
          } else if (values.cpassword !== values.password) {
            errors.cpassword = "Passwords doesn't match";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <>
            <div className="row Clogin-Main justify-content-center align-items-center pt-1">
              <section className="gradient-custom">
                <div className="container py-5 h-100 justify-content-center align-items-center">
                  <div className="row justify-content-center align-items-center h-100">
                    <div
                      className="col-12 col-lg-12 col-xl-12"
                      style={{ maxWidth: "700px"}}
                    >
                      <div
                        className="card shadow-2-strong card-registration"
                        style={{ borderRadius: "15px" , backgroundColor:"lightgray"}}
                      >
                        <div className="card-body p-4 p-md-5 mx-4">
                          <h3 className="mb-3 text-start">
                            Enter new password
                          </h3>
                          <Form>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-outline">
                                  <label className="form-label">
                                    New Password
                                  </label>
                                  <div className="two">
                                    <Field
                                      id="password"
                                      name="password"
                                      style={{ background: "white" }}
                                      type="password"
                                      className="form-control form-control-sm"
                                    />
                                    {/* <div className='showpass' onClick={() => setPassShow(!passShow)}>Show</div> */}
                                  </div>
                                  <div>
                                    <ErrorMessage
                                      name="password"
                                      component="div"
                                      className=""
                                      style={{ color: "red" }}
                                    />
                                  </div>
                                  <label className="form-label">
                                    Confirm Password
                                  </label>
                                  <div className="two">
                                    <Field
                                      id="cpassword"
                                      name="cpassword"
                                      style={{ background: "white" }}
                                      type="password"
                                      className="form-control form-control-sm"
                                    />
                                    {/* <div className='showpass' onClick={() => setPassShow(!passShow)}>Show</div> */}
                                  </div>
                                  <div>
                                    {" "}
                                    <ErrorMessage
                                      name="cpassword"
                                      component="div"
                                      className=""
                                      style={{ color: "red" }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <button
                                className="btn btn-primary btn-md mt-4"
                                type="submit"
                                disabled={isSubmitting}
                              >
                                Save
                              </button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </Formik>
    </>
  );
};

export default SetNewPassword;
