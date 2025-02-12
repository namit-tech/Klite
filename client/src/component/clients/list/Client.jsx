import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import "./client.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowDown,
  faFileInvoiceDollar,
  faMagnifyingGlass,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Dropdown } from "react-bootstrap";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Navbar/Navbar";

const apiUrl = "http://localhost:5000";
const Client = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const role = localStorage.getItem("role");
  const [customPermissions, setCustomPermissions] = useState(() => {
    const storedPermissions = localStorage.getItem("permissions");
    return storedPermissions ? JSON.parse(storedPermissions) : {};
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/clients/clientData`);
        setClients(response.data);
        console.log("Admin client list", response.data);
      } catch (error) {
        console.error(error);
        console.warn("Data not found", error);
      }
    };
    fetchClients();
  }, []);

  const handleExport = () => {
    const exportData = clients.map((client) => ({
      Sno: client._id,
      Name: client.name,
      Status: client.status,
      Role: client.role,
      CreatedAt: client.createdAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    XLSX.writeFile(workbook, "clients_list.xlsx");
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Do you want to delete this client?")) {
        await axios.delete(`${apiUrl}/api/clients/delete/${id}`);
        setClients(clients.filter((client) => client._id !== id));
      }
    } catch (error) {
      console.error("Error deleting client", error);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredClients.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;

  const currentItems = filteredClients.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemsPerPageChange = (size) => {
    setItemsPerPage(size); // Update items per page
    setCurrentPage(0); // Reset to the first page
  };

  return (
    <>
      <Sidebar role={role} customPermissions={customPermissions} />
      <Navbar />
      <div className="Client-list-table">
        <div className="list-head-btn">
          <h4>Clients</h4>
          <div className="list-btns">
            <button className="export-btn-list" onClick={handleExport}>
              <FontAwesomeIcon icon={faCloudArrowDown} />
              Export
            </button>
            <Link to="/clients/create" style={{ textDecoration: "none" }}>
              <button className="Add-btn-list">
                <FontAwesomeIcon icon={faPlus} className="add-btn-icon" />
                Add Clients
              </button>
            </Link>
          </div>
        </div>
        <form action="">
          <div className="list-search">
            <div className="input-with-icon">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="input-icon"
              />
            </div>
          </div>
        </form>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Sno.</th>
              <th>Name</th>
              <th>Status</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((client, index) => (
              <tr key={client._id}>
                <td>{offset + index + 1}</td>
                <td>{client.name}</td>
                <td>{client.status}</td>
                <td>{client.role}</td>
                <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="pen-trash">
                    <Link to={`/subscriptions/${client._id}`}>
                      <FontAwesomeIcon icon={faFileInvoiceDollar} />
                    </Link>
                    <Link to={`/clients/edit/${client._id}`}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleDelete(client._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <ReactPaginate
            previousLabel={"Prev"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination-link"}
            nextLinkClassName={"pagination-link"}
            activeClassName={"pagination-active"}
            disabledClassName={"pagination-disabled"}
          />
          <div className="pagination-settings">
            <Dropdown>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "#e5e7eb",
                  color: "black",
                  border: "none",
                }}
                id="dropdown-basic"
              >
                {itemsPerPage} items per page
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {[5, 10, 15, 20, 50].map((size) => (
                  <Dropdown.Item
                    key={size}
                    onClick={() => handleItemsPerPageChange(size)}
                  >
                    {size} items
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default Client;
