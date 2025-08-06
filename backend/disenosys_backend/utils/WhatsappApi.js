
const twilio = require('twilio');
const accountSid =process.env.TWILIO_SID;
const authToken =process.env.TWILIO_AUTH;
const client = new twilio(accountSid, authToken);


const sendLeadToWhatsapp = async (leadData) => {
  const {
    fullName,
    currentCity,
    phone,
    email,
    wp,
    currentCTC,
    _id
  } = leadData;
  try {
    const response = await client.messages.create({
      from: process.env.TWILIO_FROM, 
      to: process.env.TWILIO_TO, 
      contentSid:process.env.TWILIO_TEMPLATE, // Template SID from Twilio
      contentVariables: JSON.stringify({
        "1": fullName,
        "2": currentCity.name,
        "3": email,
        "4": phone,
        "5": wp,
        "6": currentCTC,
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