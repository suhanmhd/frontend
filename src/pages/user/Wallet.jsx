import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../axios/services/HomeServices";
import Navbar from "../../components/Navbar";
import "./Wallet.css";

export default function Wallet() {
  const [details, setDetails] = useState("");

  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const userId = JSON.parse(localStorage.getItem("user"))?.userExists?._id;

  const fetchData = async () => {
    const data = await getUserProfile(token, userId);
    setDetails(data?.userProfile);
  };

  console.log(details);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />{" "}
      <div className="wallet-page-container">
        <div className="left-container">
          <h1>My Wallet</h1>
          <p className="balance">
            Your current balance is:{" "}
            {details.wallet ? (
              <span className="balance-amount">₹ {details?.wallet}</span>
            ) : (
              <span className="balance-amount">₹ 0</span>
            )}
          </p>
        </div>
        <div className="right-container">
          <h2>Terms and Conditions</h2>
          <li>
            You are responsible for maintaining the security of your account and
            ensuring that your password is kept confidential.
          </li>
          <li>
            We reserve the right to suspend or terminate your account at any
            time, without notice.
          </li>
          <li>
            We are not responsible for any losses you may incur as a result of
            using the wallet service.
          </li>
          <li>
            By using the wallet service, you agree to indemnify and hold us
            harmless from any claims, damages, or other liabilities arising from
            your use of the service.
          </li>
          <li>
            We may update these terms and conditions at any time. By continuing
            to use the wallet service after any such updates, you agree to be
            bound by the revised terms and conditions.
          </li>
        </div>
      </div>
    </>
  );
}
