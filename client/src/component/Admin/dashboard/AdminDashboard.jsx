// import React from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   faCoins,
//   faGlobe,
//   faThumbsUp,
//   faUserGroup,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import "./admindashboard.css";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const AdminDashboard = () => {

//   const salesData = [
//     { _id: 1, totalSales: 1000 },
//     { _id: 2, totalSales: 1500 },
//     { _id: 3, totalSales: 2000 },
//     { _id: 4, totalSales: 1500 },
//     { _id: 5, totalSales: 3000 },
//     { _id: 6, totalSales: 350 },
//     { _id: 7, totalSales: 2000 },
//     { _id: 8, totalSales: 4500 },
//     { _id: 9, totalSales: 5000 },
//     { _id: 10, totalSales: 9500 },
//     { _id: 11, totalSales: 6000 },
//     { _id: 12, totalSales: 6500 },
//   ];

//   const chartData = {
//     labels: salesData.map((item) => `Month ${item._id}`),
//     datasets: [
//       {
//         label: "Sales",
//         data: salesData.map((item) => item.totalSales),
//         borderColor: "rgb(75, 192, 192)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//       },
//     ],
//   };

//   return (
//     <>
//       <div className="dashboard-tabs">
//         <div className="dashboard-tabs-info">
//           <FontAwesomeIcon icon={faUserGroup} className="tabs-icon" />
//           <h6>Total</h6>
//           <p>Admin</p>
//           <p>2</p>
//         </div>
//         <div className="dashboard-tabs-info">
//           <FontAwesomeIcon icon={faCoins} className="tabs-icon" />
//           <h6>Total</h6>
//           <p>Plan</p>
//           <p>2</p>
//         </div>
//         <div className="dashboard-tabs-info">
//           <FontAwesomeIcon icon={faGlobe} className="tabs-icon" />
//           <h6>Total</h6>
//           <p>Language</p>
//           <p>2</p>
//         </div>
//         <div className="dashboard-tabs-info">
//           <FontAwesomeIcon icon={faThumbsUp} className="tabs-icon" />
//           <h6>Total</h6>
//           <p>Earning</p>
//           <p>₹6500</p>
//         </div>
//       </div>
//       <Line data={chartData} />
//     </>
//   );
// };

// export default AdminDashboard;

// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import PermissionManager from "../../configs/PermissionManager";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
// import "./admindashboard.css";
// import axios from "axios";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const AdminDashboard = () => {
//   const [permissions, setPermissions] = useState({});
//   const handleSavePermissions = (updatedPermissions) => {
//     console.log("Updated Sidebar Permissions:", updatedPermissions);
//     setPermissions(updatedPermissions);
//   };
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const res = axios
//       .get("http://localhost:5000/api/company")
//       .then((response) => {
//         setData(response.data);
//       });
//     console.log("response.data", res.data).catch((error) => {
//       console.error("Error fetching data:", error);
//     });
//   }, []);

//   const salesData = [
//     { _id: 1, totalSales: 1000 },
//     { _id: 2, totalSales: 1500 },
//     { _id: 3, totalSales: 2000 },
//     { _id: 4, totalSales: 1500 },
//     { _id: 5, totalSales: 3000 },
//     { _id: 6, totalSales: 350 },
//     { _id: 7, totalSales: 2000 },
//     { _id: 8, totalSales: 4500 },
//     { _id: 9, totalSales: 5000 },
//     { _id: 10, totalSales: 9500 },
//     { _id: 11, totalSales: 6000 },
//     { _id: 12, totalSales: 6500 },
//   ];

//   const chartData = {
//     labels: salesData.map((item) => `Month ${item._id}`),
//     datasets: [
//       {
//         label: "Sales",
//         data: salesData.map((item) => item.totalSales),
//         borderColor: "rgb(75, 192, 192)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//       },
//     ],
//   };

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>
//       <div className="dashboard-blocks">
//         <div className="block-data">
//           <div>
//             <h5>Total Opportunities</h5>
//             <p>{data.opportunities.total}</p>
//           </div>
//           <div className="bar-progress">
//             <div style={{ width: 150, height: 150 }}>
//               <CircularProgressbar
//                 value={data.opportunities.progress} // Progress percentage
//                 text={`${data.opportunities.progress}%`}
//                 styles={buildStyles({
//                   textColor: "#3e98c7",
//                   pathColor: "#3e98c7",
//                   trailColor: "#d6d6d6",
//                 })}
//               />
//             </div>
//             <div className="bar-data">
//               <p>Cold Leads: {data.opportunities.leads.cold}</p>
//               <p>Warm Leads: {data.opportunities.leads.warm}</p>
//               <p>Hot Leads: {data.opportunities.leads.hot}</p>
//             </div>
//           </div>
//         </div>
//         <div className="block-data">
//           <div>
//             <h5>Total Opportunities</h5>
//             <p>48</p>
//           </div>
//           <div className="bar-progress">
//             <div style={{ width: 150, height: 150 }}>
//               <CircularProgressbar
//                 value={70} // Progress percentage
//                 text={`70%`}
//                 styles={buildStyles({
//                   textColor: "#3e98c7",
//                   pathColor: "#3e98c7",
//                   trailColor: "#d6d6d6",
//                 })}
//               />
//             </div>
//             <div className="bar-data">
//               <p>cold Leads</p>
//               <p>Warm Leads</p>
//               <p>Hot Leads</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Sales Chart */}
//       <div className="sales-chart">{/* <Line data={chartData} /> */}</div>

//       {/* Permission Manager */}
//       {/* <div className="permission-manager">
//         <h2>Manage Sidebar Permissions</h2>
//         <PermissionManager onSave={handleSavePermissions} />
//       </div> */}
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import "./admindashboard.css";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AdminDashboard = () => {
  const [data, setData] = useState(null); // Data starts as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const res = axios.get("http://localhost:5000/api/company") // Ensure the backend is running
      .then((response) => {
        setData(response.data);
        console.log("res", response.data);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // ✅ Add a null check before rendering data
  if (!data) return <p>No data available</p>;

  return (
    <>
    <div className="dashboard-graphs">
    <div className="block-data">
      <div>
        <h5>Total Opportunities</h5>
        <p>{data.company}</p>
        <p>{data?.opportunities?.total || 0}</p>
      </div>
      <div className="bar-progress">
        <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar
            value={data?.opportunities?.progress || 0} // Prevent undefined errors
            text={`${data?.opportunities?.progress || 0}%`}
            styles={buildStyles({
              textColor: "#3e98c7",
              pathColor: "#3e98c7",
              trailColor: "#d6d6d6",
            })}
            />
        </div>
        <div className="bar-data">
          <p>Cold Leads: {data?.opportunities?.leads?.cold || 0}</p>
          <p>Warm Leads: {data?.opportunities?.leads?.warm || 0}</p>
          <p>Hot Leads: {data?.opportunities?.leads?.hot || 0}</p>
        </div>
      </div>
    </div>
    <div className="block-data">
      <div>
        <h5>Total Sales</h5>
        <p>{data.company}</p>
        <p>{data?.sales?.total_revenue || 0}</p>
      </div>
      <div className="bar-progress">
        <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar
            value={data?.opportunities?.progress || 0} // Prevent undefined errors
            text={`${data?.opportunities?.progress || 0}%`}
            styles={buildStyles({
              textColor: "#3e98c7",
              pathColor: "#3e98c7",
              trailColor: "#d6d6d6",
            })}
            />
        </div>
        <div className="bar-data">
          <p> Leads: {data?.opportunities?.leads?.cold || 0}</p>
          <p>Warm Leads: {data?.opportunities?.leads?.warm || 0}</p>
          <p>Hot Leads: {data?.opportunities?.leads?.hot || 0}</p>
        </div>
      </div>
    </div>
            </div>
            </>
  );
};

export default AdminDashboard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminDashboard = () => {
//   const [qrCode, setQrCode] = useState("");
//   const [otp, setOtp] = useState("");
//   const [googleAuthEnabled, setGoogleAuthEnabled] = useState(false);
//   const [loading, setLoading] = useState(true); // Loading state for fetching initial data
//   const navigate = useNavigate();
//   const email = localStorage.getItem("email");

//   useEffect(() => {
//     const fetchOtpSetup = async () => {
//       try {
//         // Check if OTP is already enabled
//         const response = await axios.get(
//           "http://localhost:5000/api/admin/check-otp-status",
//           {
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//           }
//         );

//         if (response.data.otpEnabled) {
//           setGoogleAuthEnabled(true); // OTP is already enabled, no need for setup
//           setLoading(false);
//         } else {
//           // Fetch OTP setup details
//           const setupResponse = await axios.post(
//             "http://localhost:5000/api/admin/otp-setup",
//             { email },
//             { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//           );
//           console.log("setupresponse", setupResponse);

//           setQrCode(setupResponse.data.qrCode);
//           setGoogleAuthEnabled(false); // OTP is not enabled yet, show QR code setup
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Error fetching OTP setup", error);
//         setLoading(false);
//       }
//     };

//     fetchOtpSetup();
//   }, [email]);

//   const handleOtpEnable = async (e) => {
//     e.preventDefault();
//     try {
//       // Verify OTP and enable it
//       await axios.post(
//         "http://localhost:5000/api/admin/enable-otp",
//         { email, otp },
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       alert("Google 2FA enabled successfully!");
//       setGoogleAuthEnabled(true); // Mark OTP as enabled
//     } catch (error) {
//       console.error("Error verifying OTP", error);
//       alert("Invalid OTP");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Loading state
//   }

//   return (
//     <div className="admin-dashboard">
//       <h2>Admin Dashboard</h2>

//       {!googleAuthEnabled ? (
//         <div className="otp-setup">
//           <h3>Enable 2FA (Google Authenticator)</h3>
//           <p>Scan this QR code in Google Authenticator:</p>
//           <img src={qrCode} alt="QR Code" />

//           <form onSubmit={handleOtpEnable}>
//             <label>Enter OTP from Google Authenticator:</label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//             <button type="submit">Enable 2FA</button>
//           </form>
//         </div>
//       ) : (
//         <p>2FA is enabled for your account.</p>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;
