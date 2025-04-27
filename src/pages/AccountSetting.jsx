import React from "react";
import UpdateProfile from "../components/UpdateProfile";
import ChangePassword from "../components/ChangePassword";
import OrderHistory from "../components/OrderHistory";
import EmailPreferences from "../components/EmailPreferences";
import NewPayment from "../components/NewPayment";
import NewAddress from "../components/NewAddress";

import "./account.css"; // Assuming you have a CSS file for styling

const AccountSetting = () => (
  <div className="account-settings">
    <div className="container mt-4 px-4">
      <div className="flex flex-col lg:flex-row gap-4">

        {/* Left Section - History & Preferences */}
        <div className="flex flex-col lg:flex-1 gap-4">

          <div className="history">
            <OrderHistory />
          </div>

          <div className="preferences">
            <EmailPreferences />
          </div>

          <div className="address">
            <NewAddress />
          </div>
        </div>

        {/* Right Section - Payment & Profile */}
        <div className="flex flex-col lg:flex-1 gap-4">

          <div className="payment">
            <NewPayment />
          </div>

          <div className="profile">
            <UpdateProfile />
          </div>

          <div className="password">
            <ChangePassword />
          </div>

        </div>

      </div>
    </div>
  </div>
);

export default AccountSetting;
