import axios from "axios";
import React, { useState } from "react";

const Landing = () => {
    const [data, setData] = useState({
        leadName: "",
        leadType: "",
        companyName: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/create`, data);
            alert("Lead Created Successfully!");
        } catch (error) {
            console.error("Error adding lead:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="leadName">Lead Name</label>
                <input type="text" name="leadName" value={data.leadName} onChange={handleChange} required />

                <label htmlFor="leadType">Lead Type</label>
                <select name="leadType" value={data.leadType} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Person">Person</option>
                    <option value="Organization">Organization</option>
                </select>

                <label htmlFor="companyName">Company Name</label>
                <input type="text" name="companyName" value={data.companyName} onChange={handleChange} required />

                <button type="submit">Create Lead</button>
            </form>
        </div>
    );
};

export default Landing;

