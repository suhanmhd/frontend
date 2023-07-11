import React, { useState } from "react";
import { toast } from "react-toastify";
import { sendResetLink } from "../../axios/services/HomeServices";
import Navbar from "../../components/Navbar";

const ForgotPassword = () => {
    const [email, setEmail] = useState("")

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        const response = await sendResetLink({email: email})
        if (response.error) {
            toast.error(response.error)
        } else if (response.status) {
            toast.success(response.message)
        }
    }

return (
    <>
    <Navbar/>
    <div className="row Clogin-Main justify-content-center align-items-center mt-2 pt-1">
        <section className="gradient-custom">
            <div className="container py-5 h-100 justify-content-center align-items-center">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-12 col-xl-12" style={{ maxWidth: '700px' }}>
                        <div
                            className="card shadow-2-strong card-registration"
                            style={{ borderRadius: '15px' }}
                        >
                            <div className="card-body p-4 p-md-5 mx-4">
                                <h4 className="mb-3 text-start">Enter your email to reset password</h4>
                                <form onSubmit={handleOnSubmit}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-outline">
                                                <input
                                                    style={{ background: "lightgray" }}
                                                    type="text"
                                                    id="email"
                                                    value={email}
                                                    required
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                    }}
                                                    className="form-control form-control-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <input
                                            className="btn btn-primary btn-md mt-4"
                                            type="submit"
                                            value="Send"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</>
)
}

export default ForgotPassword