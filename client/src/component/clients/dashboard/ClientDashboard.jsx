import axios from "axios";
import React, { useEffect, useState } from "react";

const apiUrl = "http://localhost:5000";

const ClientDashboard = ({ onSave, permissions }) => {
  const [client, setClient] = useState(null);
  const loggedInEmail = localStorage.getItem("email");

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        if (!loggedInEmail) {
          console.warn("No logged-in user found.");
          return;
        }

        const response = await axios.get(
          `${apiUrl}/api/clients/clientData/${loggedInEmail}`
        );
        setClient(response.data);
      } catch (error) {
        console.error("Error fetching client data", error);
      }
    };

    fetchClientData();
  }, [loggedInEmail]);

  return (
    <>
      {client ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Role</th>
                <th>Email</th>
                <th>Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{client.name}</td>
                <td>{client.status}</td>
                <td>{client.role}</td>
                <td>{client.email}</td>
                <td>{client.mobileNumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading client data...</p>
      )}
    </>
  );
};


export default ClientDashboard;
