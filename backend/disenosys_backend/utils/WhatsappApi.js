
const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = new twilio(accountSid, authToken);

const sendLeadToWhatsapp = async (leadData) => {
  const {
    fullName,
    phone,
    currentLocation,
    currentSalary,
    _id
  } = leadData;

  try {
    const response = await client.messages.create({
      from: process.env.TWILIO_TO, // Your approved WhatsApp number
      to: process.env.TWILIO_FROM,    // Sales team number
      contentSid:process.env.TWILIO_TEMPLATE, // Template SID from Twilio
      contentVariables: JSON.stringify({
        "1": fullName || "No Name",
        "2": phone || "No Phone",
        "3": currentLocation || "No Location",
        "4": currentSalary || "0",
        "5": _id // for reply tracking
      }),
      persistentAction: [
        `reply?payload=interested_${_id}`,
        `reply?payload=not_interested_${_id}`
      ]
    });

    console.log("✅ Message sent successfully:", response.sid);
  } catch (error) {
    console.error("❌ Failed to send message:", error.message);
  }
};

module.exports = sendLeadToWhatsapp;