const express = require("express");
const router = express.Router();
const Client = require("../models/client-modal");
const bcrypt = require("bcryptjs");
const { verifyToken } = require("../middlewares/auth");

router.post("/add", async (req, res) => {
  try {
    const { name, status, role, createdAt, email, password, mobileNumber } =
      req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newClient = new Client({
      name,
      status,
      role,
      createdAt,
      email,
      password: hashedPassword, // Save hashed password
      mobileNumber,
    });

    await newClient.save();
    res
      .status(201)
      .json({ message: "Client added successfully", client: newClient });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding client", details: error.message });
  }
});

router.get("/clientData/:email", async (req, res) => {
  try {
    const { email } = req.params; // Get email from request params
    console.log("email", email);

    const client = await Client.findOne({ email: email.toLowerCase() });
    console.log("clientemail", client);

    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.json(client);
  } catch (error) {
    console.error("Error fetching client data:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all clients
router.get("/clientData", async (req, res) => {
  try {
    const clients = await Client.find();
    console.log("clients", clients);

    res.status(200).json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching clients", details: error.message });
  }
});

// Get a single client by ID
router.get("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching client", details: error.message });
  }
});

// Update a client by ID
router.put("/update/:id", async (req, res) => {
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res
      .status(200)
      .json({ message: "Client updated successfully", client: updatedClient });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error updating client", details: error.message });
  }
});

// Delete a client by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting client", details: error.message });
  }
});

module.exports = router;
