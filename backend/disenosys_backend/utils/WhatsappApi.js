const axios = require("axios");
const qs = require("qs");

const sendLeadToWhatsapp = async (leadData) => {
  const {
    fullName,
    currentLocation,
    email,
    phone,
    whatsapp,
    currentSalary,
    _id
  } = leadData;

  const payload = {
    source: "919940037999", // Your Gupshup sender number
    destination: "916382209795", // ✅ Send to this specific number with country code
    template: JSON.stringify({
      id: "d4525a9a-52fe-4861-b317-1ca6d7c79a08",
      params: [
        fullName || "No Name",
        currentLocation || "No Location",
        email || "No Email",
        phone || "No Phone",
        whatsapp || "No WhatsApp",
        currentSalary || "0",
      ],
      // ✅ Add Quick Reply buttons
      buttons: [
        {
          type: "quick_reply",
          title: "Interested",
          id: _id,
        },
        {
          type: "quick_reply",
          title: "Not Interested",
          id: _id,
        },
      ],
    }),
  };

  const data = qs.stringify(payload);

  try {
    const res = await axios.post(
      "https://api.gupshup.io/wa/api/v1/template/msg",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          apikey: "sk_26bb150fd3bb4a1a86019e1a044fbbaf", // Your API key
        },
      }
    );

    console.log("✅ Message sent successfully:", res.data);
  } catch (err) {
    console.error("❌ Error sending WhatsApp message:", err.response?.data || err.message);
  }
};

module.exports = sendLeadToWhatsapp;
