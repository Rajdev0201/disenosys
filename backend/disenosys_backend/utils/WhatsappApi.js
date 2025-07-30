const axios = require("axios");
const qs = require("qs");

const sendLeadToWhatsapp = async (leadData) => {
  const { fullName, phone, _id } = leadData;

  const params = {
    channel: "whatsapp",
    source: "919940037999",
    destination: "6382209795" , // or use static "6382209795"
    template: "leads_edutech", // make sure this matches your approved template
    "template.params": JSON.stringify([fullName, phone]),
    message: JSON.stringify({
      type: "quick_reply",
      msg: "Please respond below.",
      options: [
        {
          type: "text",
          title: "Interested",
          postbackText: `interested_${_id}`,
        },
        {
          type: "text",
          title: "Not Interested",
          postbackText: `notinterested_${_id}`,
        },
      ],
    }),
  };

  const data = qs.stringify(params);

  try {
    const res = await axios.post("https://api.gupshup.io/sm/api/v1/msg", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        apikey: "5vsaj1b2msdqaj4ff0irvfuh0lynihry", // replace with your actual key
      },
    });

    console.log("Message sent:", res.data);
  } catch (err) {
    console.error("Failed to send message:", err.response?.data || err.message);
  }
};


module.exports = sendLeadToWhatsapp;
