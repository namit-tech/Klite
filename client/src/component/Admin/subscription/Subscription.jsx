import React, { useEffect, useState } from "react";
import "./subscription.css"; // import custom styles
import {
  FaCheckCircle,
  FaRegClock,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa"; // Adding icons
import axios from "axios"; // Importing axios for API calls
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";
import { useParams } from "react-router-dom";
const apiUrl = "http://localhost:5000";

const Subscription = () => {
  const [loading, setLoading] = useState(false); // To handle loading state during payment
  const { id } = useParams(); // Get client ID from URL params
  const [client, setClient] = useState(null); // Store client details (initialized to null)

  const role = localStorage.getItem("role");
  const [customPermissions, setCustomPermissions] = useState(() => {
    const storedPermissions = localStorage.getItem("permissions");
    return storedPermissions ? JSON.parse(storedPermissions) : {};
  });

  const plans = [
    {
      name: "Pro Plan",
      price: "$99/year",
      duration: "Yearly",
      amount: 9900, // amount in paisa (not used in this demo)
      features: [
        { icon: <FaCheckCircle />, text: "Access to all features" },
        { icon: <FaRegClock />, text: "50 GB of storage" },
        { icon: <FaUsers />, text: "24/7 premium support" },
        { icon: <FaShieldAlt />, text: "Advanced security" },
      ],
    },
  ];

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const res = await axios.get(`${apiUrl}/api/clients/${id}`);
        setClient(res.data); // Store fetched client details in the state
      } catch (error) {
        console.error("Error fetching client details:", error);
      }
    };

    if (id) {
      fetchClientDetails(); // Fetch client data only if the id exists
    }
  }, [id]); // Depend on the `id` to refetch if it changes

  const handlePayment = async (plan) => {
    try {
      setLoading(true); // Set loading state to true while payment is being processed

      // Simulate a successful payment (as if payment is successful)
      setTimeout(() => {
        alert("Payment successful!");
      }, 2000);

      setLoading(false); // Set loading state to false once payment process is completed
    } catch (error) {
      console.error("Payment Error:", error);
      setLoading(false); // Set loading state to false in case of error
      alert("Payment failed, please try again");
    }
  };

  return (
    <>
      <Sidebar role={role} customPermissions={customPermissions} />
      <Navbar />
      <div className="subscription-page">
        <div className="plans-container">
          {plans.map((plan, index) => (
            <div className="plan-card" key={index}>
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-price">{plan.price}</p>
              <p className="plan-duration">{plan.duration}</p>
              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <span className="feature-icon">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>
              <button
                className="subscribe-btn"
                onClick={() => handlePayment(plan)} // Trigger payment on click
                disabled={loading}
              >
                {loading ? "Processing..." : "Subscribe Now"}
              </button>
            </div>
          ))}
        </div>

        {client && (
          <table className="styled-table-sub">
            <thead>
              <tr>
                <th>Sno.</th>
                <th>Name</th>
                <th>Status</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{client.name}</td>
                <td>{client.status}</td>
                <td>{client.role}</td>
                <td>{new Date(client.createdAt).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Subscription;

