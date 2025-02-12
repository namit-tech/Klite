import React, { useState } from "react";
import "./createcontact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router";
import Sidebar from "../../../../Sidebar/Sidebar";
import Navbar from "../../../../Navbar/Navbar";

const CreateContact = () => {
    const [contact, setContact] = useState({
        image: null,
        name: "",
        jobTitle: "",
        companyName: "",
        email: "",
        phone: "",
        dealsOwner: "",
        tags: "",
        source: "",
        industry: "",
        description: "",
        address: "",
        socialProfiles: ""
    });

    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const [customPermissions, setCustomPermissions] = useState(() => {
        const storedPermissions = localStorage.getItem("permissions");
        return storedPermissions ? JSON.parse(storedPermissions) : {};
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setContact({ ...contact, image: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            for (const key in contact) {
                formData.append(key, contact[key]);
            }
            await axios.post(`${process.env.REACT_APP_API_URL}/api/contacts/create`, formData);
            navigate("/contacts");
        } catch (error) {
            console.error("Error adding contact:", error);
        }
    };

    return (
        <>
            <div className="edit-div">
                <Sidebar role={role} customPermissions={customPermissions} />
                <Navbar />
                <h3 className="Edit-head">Create Contact</h3>
                <div className="contact-edit-info">
                    <form onSubmit={handleSubmit}>
                        <div className="basic-info-edit">
                            <div className="form-contact-input">
                                <label>Upload Image</label>
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            </div>
                            <div className="form-contact-input">
                                <label>Name</label>
                                <input type="text" name="name" value={contact.name} onChange={handleChange} required />
                            </div>
                            <div className="form-contact-input">
                                <label>Job Title</label>
                                <input type="text" name="jobTitle" value={contact.jobTitle} onChange={handleChange} />
                                <label>Company Name</label>
                                <input type="text" name="companyName" value={contact.companyName} onChange={handleChange} />
                            </div>
                            <div className="form-contact-input">
                                <label>Email</label>
                                <input type="email" name="email" value={contact.email} onChange={handleChange} required />
                                <label>Phone</label>
                                <input type="tel" name="phone" value={contact.phone} onChange={handleChange} />
                            </div>
                            <div className="form-contact-input">
                                <label>Deals Owner</label>
                                <input type="text" name="dealsOwner" value={contact.dealsOwner} onChange={handleChange} />
                                <label>Tags</label>
                                <input type="text" name="tags" value={contact.tags} onChange={handleChange} />
                            </div>
                            <div className="form-contact-input">
                                <label>Source</label>
                                <input type="text" name="source" value={contact.source} onChange={handleChange} />
                                <label>Industry</label>
                                <input type="text" name="industry" value={contact.industry} onChange={handleChange} />
                            </div>
                            <div className="form-contact-input">
                                <label>Description</label>
                                <textarea name="description" value={contact.description} onChange={handleChange} />
                            </div>
                            <div className="form-contact-input">
                                <label>Address</label>
                                <textarea name="address" value={contact.address} onChange={handleChange} />
                            </div>
                            <div className="form-contact-input">
                                <label>Social Profiles</label>
                                <input type="text" name="socialProfiles" value={contact.socialProfiles} onChange={handleChange} />
                            </div>
                            <div className="bottom-button">
                                <button className="discard-btn" type="button">
                                    <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} /> Discard
                                </button>
                                <button className="create-btn" type="submit">
                                    Create Contact
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateContact;

