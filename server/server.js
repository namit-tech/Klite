require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
// const { Server } = require("socket.io");

// Import Routes
const adminRoutes = require("./routes/Admin/adminRoutes");
const clientRoutes = require("./routes/clients/clientRoute");
const userRoutes = require("./routes/userRoute");
const paymentRoutes = require("./routes/googleRoute");
const DashboardRoutes = require("./routes/DashboardRoute");
// const LeadRoutes = require("./routes/leadsRoute");
const WebHookRoutes = require("./routes/webhookRoutes");
const SubscriptionRoutes = require("../server/routes/Admin/subscriptionRoute");
const UserSubscriptionRoutes = require("../server/routes/clients/UserSubscriptionRoute");

const { Collection1, Collection2 } = require("./database/db"); // Import Models

const app = express();
const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "*" } });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", paymentRoutes);
app.use("/api", DashboardRoutes);
// app.use("/api", LeadRoutes);
app.use("/", WebHookRoutes);
app.use("/api", SubscriptionRoutes);
app.use("/api", UserSubscriptionRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));





// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const Admin = require("../models/admin-model");
// const dotenv = require("dotenv");
// dotenv.config();
// const router = express.Router();
// const Client = require("../models/client-modal");
// const User = require("../models/User-model");
// const { verifyToken } = require("../middlewares/auth");

// // Register Route
// router.post("/register", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(`Register request received for email: ${email}`);

//   try {
//     const existingUser = await Admin.findOne({ email });
//     if (existingUser) {
//       console.log(`Email already in use: ${email}`);
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     const salt = await bcrypt.genSalt(10); // Generate salt
//     const hashedPassword = await bcrypt.hash(password, salt); // Hash password with salt

//     const newAdmin = new Admin({
//       email,
//       password: hashedPassword,
//     });

//     await newAdmin.save();
//     console.log(`User registered successfully: ${email}`);

//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     console.error("Error during registration:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Login Route
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   console.log(`Login attempt for email: ${email}`);

//   try {
//     const admin =
//       (await Admin.findOne({ email })) || (await Client.findOne({ email })) || (await User.findOne({ email }));
//     console.log("admin email", admin);

//     if (!admin) {
//       console.log(`Invalid email or password for email: ${email}`);
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Compare entered password with hashed password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       console.log(`Invalid password attempt for email: ${email}`);
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign(
//       { adminId: admin._id, role: admin.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );
//     console.log("token", token);

//     console.log(`Login successful for email: ${email}`);

//     res.json({ token });
//   } catch (error) {
//     console.error("Error during login:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Dashboard Route (Client access only)
// router.get("/dashboard", verifyToken, (req, res) => {
//   console.log(`Dashboard request by user ID: ${req.user.adminId}`);

//   if (req.user.role !== "client") {
//     console.log(
//       `Access denied for user ID: ${req.user.adminId}. Only clients can access this.`
//     );
//     return res.status(403).send("Access denied. Only clients can access this.");
//   }

//   // Fetch data for the client based on req.user.clientId or similar
//   Client.findById(req.user.clientId)
//     .then((client) => {
//       console.log(`Fetched client data for client ID: ${req.user.clientId}`);
//       res.json(client);
//     })
//     .catch((err) => {
//       console.error(
//         `Error fetching client data for client ID: ${req.user.clientId}`,
//         err
//       );
//       res.status(500).send("Error fetching client data");
//     });
// });

// module.exports = router;

