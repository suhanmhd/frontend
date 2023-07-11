import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyOTP } from "../../axios/services/HomeServices";
import Navbar from "../../components/Navbar";

const EnterOTP = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { id } = params;

  const [otp, setOtp] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = await verifyOTP({otp: otp}, id);
    console.log(data.verified);
    if (data.verified) {
      toast.success("OTP verified you can login");
      navigate("/login");
    } else {
      toast.error("Please regenerate otp and try again");
    }
  };
  return (
    <>
      <Navbar />
      <div className="row justify-content-center align-items-center pt-1">
        <section className="gradient-custom">
          <div className="container py-5 h-100 justify-content-center align-items-center">
            <div className="row justify-content-center align-items-center h-100">
              <div
                className="col-12 col-lg-12 col-xl-12"
                style={{ maxWidth: "700px" }}
              >
                <div
                  className="card shadow-2-strong card-registration"
                  style={{ borderRadius: "15px" }}
                >
                  <div className="card-body p-4 p-md-5 mx-4">
                    <h3 className="mb-3 text-start">
                      Enter the OTP received in your e-mail
                    </h3>

                    <form onSubmit={onSubmit}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-outline">
                            <div className="two">
                              <input
                                name="otp"
                                style={{ background: "lightgray" }}
                                type="number"
                                value={otp}
                                required
                                onChange={(e) => {
                                  setOtp(e.target.value);
                                }}
                                className="form-control form-control-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <input
                          className="btn btn-md btn-primary mt-4"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </form>
                    <Link to="/resendOtp">
                      <h6 className="btnhover d-flex pt-3 justify-content-center OTP-textcolour">
                        Resend OTP?
                      </h6>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EnterOTP;
