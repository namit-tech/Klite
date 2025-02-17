const express = require("express");
const router = express.Router();
const Client = require("../../models/clients/client-modal");
const Subscription = require("../../models/Admin/Subscription");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { verifyToken } = require("../../middlewares/auth");

router.post("/register", async (req, res) => {
  try {
    const { fullName,
      email,
      phone,
      companyName,
      companyWebsite,
      industryType,
      selectedPlan,
      selectedPlanId,
      password, } =
      req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newClient = new Client({
      fullName,
      email,
      phone,
      companyName,
      companyWebsite,
      industryType,
      selectedPlan,
      selectedPlanId,
      password: hashedPassword, // Save hashed password
    });

    await newClient.save();
    res
      .status(201)
      .json({ message: "User added successfully", client: newClient });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error adding user", details: error.message });
  }
});


router.get("/total-clients", async (req, res) => {
  try {
    // Count all clients (active and inactive)
    const totalClients = await Client.countDocuments();

    // Count active clients specifically
    const activeClients = await Client.countDocuments({ status: "Active" });

    res.status(200).json({ totalClients, activeClients });
  } catch (error) {
    console.error("Error fetching total clients:", error);
    res.status(500).json({ message: "Failed to fetch total clients" });
  }
});

router.get("/monthlyrevenue", async (req, res) => {
  try {
    // Log the request for monthly revenue
    console.log("Request received to fetch monthly revenue.");

    // Fetch all clients
    const clients = await Client.find({});
    console.log(`Fetched ${clients.length} clients from the database.`);

    // Initialize the revenue data object
    let revenueData = {};

    // Loop through clients to calculate revenue grouped by month
    for (const client of clients) {
      console.log(`Processing client: ${client.fullName}, Created At: ${client.createdAt}`);

      // Example: Using client's createdAt to determine the month
      const month = new Date(client.createdAt).toLocaleString("default", { month: "short", year: "numeric" });
      console.log(`Client's month of creation: ${month}`);

      // Fetch the subscription price from the db1 (Subscription model)
      console.log(`Fetching subscription details for Plan ID: ${client.selectedPlanId}`);
      const subscription = await Subscription.model("Subscription").findById(client.selectedPlanId);

      // Log subscription fetch result
      if (subscription) {
        console.log(`Found subscription: ${subscription.name} with price: ${subscription.price}`);
      } else {
        console.log(`No subscription found for Plan ID: ${client.selectedPlanId}`);
      }

      // Ensure the subscription exists and price is available
      const price = subscription && subscription.price ? parseFloat(subscription.price) : 0;
      console.log(`Price for the plan: ${price}`);

      if (price > 0) {
        // Add the price to the respective month
        if (!revenueData[month]) {
          revenueData[month] = 0;
        }
        revenueData[month] += price;
        console.log(`Added ${price} to ${month}. Current total: ${revenueData[month]}`);
      } else {
        console.log(`Skipping client ${client.fullName} as the price is 0 or invalid.`);
      }
    }

    // Log the final revenue data
    console.log("Final revenue data:", revenueData);

    // Send the revenue data as the response
    res.json({ revenueData });

  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    res.status(500).json({ error: "Error fetching monthly revenue" });
  }
});


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
