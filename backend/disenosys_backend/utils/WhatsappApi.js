const axios = require("axios");
const qs = require("qs");
const gupshup = require("gupshup-whatsapp-api");

// *New Lead Alert - Disenosys*
// Name: {{1}}
// Phone: {{2}}
// Company: {{3}} | CTC: {{4}} ➔ {{5}}
// Location: {{6}} | Relocate: {{7}}
// Notice: {{8}} (Negotiable: {{9}})
// Urgency: {{10}}

const client = new gupshup({
  apiKey: "5vsaj1b2msdqaj4ff0lynihry",
});

const sendLeadToWhatsapp = async (leadData) => {
  const {
    fullName,
    phone,
    currentCompany,
    currentCTC,
    expectedCTC,
    currentLocation,
    willingToRelocate,
    noticePeriod,
    noticeNegotiable,
    urgency,
    _id,
  } = leadData;

  const messageText =
    `⚡ *New Job Lead Alert - Disenosys*\n` +
    `*Name:* ${fullName}\n` +
    `*Phone:* ${phone}\n` +
    `*Company:* ${currentCompany} | CTC: ${currentCTC} ➔ ${expectedCTC}\n` +
    `*Location:* ${currentLocation} | Relocate: ${willingToRelocate}\n` +
    `*Notice Period:* ${noticePeriod} (Negotiable: ${noticeNegotiable})\n` +
    `*Urgency:* ${urgency}\n`;

  const recipients = ["916382209795", "917094058536"];

  for (let recipient of recipients) {
    const data = qs.stringify({
      channel: "whatsapp",
      source: "916382209795",
      destination: recipient,
      message: JSON.stringify({
        type: "interactive",
        interactive: {
          type: "button",
          header: {
            type: "text",
            text: "New Lead Alert",
          },
          body: {
            text: messageText,
          },
          footer: {
            text: "Click below to respond",
          },
          action: {
            buttons: [
              {
                type: "reply",
                reply: {
                  id: `interested_${_id}`,
                  title: "✅ Interested",
                },
              },
              {
                type: "reply",
                reply: {
                  id: `notinterested_${_id}`,
                  title: "❌ Not Interested",
                },
              },
            ],
          },
        },
      }),
      msgType: "interactive",
    });

    await axios.post("https://api.gupshup.io/wa/api/v1/msg", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        apikey: "5vsaj1b2msdqaj4ff0irvfuh0lynihry",
      },
    });
  }
};

module.exports = sendLeadToWhatsapp;
