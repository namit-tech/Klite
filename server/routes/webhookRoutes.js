const express = require("express");
const axios = require("axios");

const router = express.Router();

// ✅ Use Temporary Meta API Keys
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const ACCESS_TOKEN = "YOUR_TEMPORARY_ACCESS_TOKEN"; // Get from Meta
const PHONE_NUMBER_ID = ""; // Get from Meta

// ✅ Webhook Verification (Required for Meta API)
router.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook Verified!");
    res.status(200).send(challenge);
  } else {
    console.log("❌ Webhook Verification Failed!");
    res.status(403).send("Verification failed!");
  }
});

// ✅ Webhook to Receive WhatsApp Messages
router.post("/webhook", (req, res) => {
  if (req.body.object) {
    const entry = req.body.entry[0]?.changes[0]?.value;
    if (entry?.messages) {
      const message = entry.messages[0];
      const senderPhone = message.from;
      const messageText = message.text.body;

      console.log(`📩 New Message from ${senderPhone}: ${messageText}`);
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

// ✅ Send a Test WhatsApp Message
router.post("/send-message", async (req, res) => {
  const { phone, message } = req.body;

  try {
    await axios.post(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: phone,
        type: "text",
        text: { body: message },
      },
      { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
    );

    res.status(200).json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("❌ Error sending message:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
});

module.exports = router;

