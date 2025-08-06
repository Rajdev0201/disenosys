const Leads = require("../models/leads.js");
const sendLeadToWhatsapp = require("../utils/WhatsappApi.js");
const Gupshup = require('gupshup-whatsapp-api')
  const axios = require("axios");

let client = new Gupshup({
	apiKey: '5vsaj1b2msdqaj4ff0irvfuh0lynihry'
});

exports.handleLeadSubmission = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      wp,
      linkedin,
      currentCompany,
      currentDesignation,
      currentCTC,
      expectedCTC,
      noticePeriod,
      noticeNegotiable,
      experience,
      relevant,
      engagementType,
      urgency,
      message,
    } = req.body;

const currentCountry = JSON.parse(req.body.currentCountry);
const currentState = JSON.parse(req.body.currentState);
const currentCity = JSON.parse(req.body.currentCity);


    const resume = req.file?.filename;
    
    const data = new Leads({
      fullName,
      phone,
      email,
      wp,
      linkedin,
      currentCompany,
      currentDesignation,
      currentCTC,
      expectedCTC,
      noticePeriod,
      noticeNegotiable,
      currentCountry,
      currentState,
      currentCity,
      experience,
      relevant,
      engagementType,
      urgency,
      message,
      resume:resume
    })
    await data.save();
    // await sendLeadToWhatsapp(data);

    return res.status(200).json({ message: "Data captured successfully!",data });
  } catch (error) {
    console.error("Lead submit error:", error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};


// exports.postHook = async (req, res) => {
//   try {
//     const payload = req.body;
//     console.log(payload)
//     const replyId = payload?.payload?.reply?.id;
//     console.log(replyId)
//     if (!replyId) return res.sendStatus(200);

//     const [responseType, leadId] = replyId.split("_");

//     const lead = await Leads.findById(leadId);
//     if (!lead) return res.status(404).json({ error: "Lead not found" });

//     lead.status = responseType === "interested" ? "Interested" : "Not Interested";
//     await lead.save();

//     console.log(`Lead ${leadId} marked as ${lead.status}`);
//     return res.sendStatus(200);
//   } catch (error) {
//     console.error("Webhook error:", error);
//     return res.sendStatus(500);
//   }
// };

exports.postHook = async (req, res) => {
  try {
    const payload = req.body;
    const replyId = payload?.Body || ""; // Twilio webhook sends reply text/payload

    const [responseType, leadId] = replyId.split("_");
    const lead = await Leads.findById(leadId);
    if (!lead) return res.status(404).json({ error: "Lead not found" });

    lead.status = responseType === "interested" ? "Interested" : "Not Interested";
    await lead.save();

    console.log(`Lead ${leadId} marked as ${lead.status}`);
    return res.sendStatus(200);
  } catch (error) {
    console.error("Webhook error:", error);
    return res.sendStatus(500);
  }
};

exports.getLeads = async (req,res) => {
  try{
    const data = await Leads.find();
    return res.status(200).json({message:"get the data",data})
  }catch(err){
    
  }
}

exports.updateStaus = async (req,res) => {
  const {id} = req.params;
  const {status} = req.body;

  try{
      const update = await Leads.findByIdAndUpdate(id,
      {
        $set:{updatedStatus:status}
      },
      {new:true}
    );
      if(!update){
        return res.status(400).json({message:"Not found the data"})
      }
      return res.status(200).json({message:"Updated Student Status..",update})
  }catch(err){
     return res.status(500).json({message:"something went wrong",err})
  }
}






//test 

exports.test =  async (req, res) => {
  const { to } = req.body;

  const headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
    'apikey': '5vsaj1b2msdqaj4ff0irvfuh0lynihry',
  };

  const data = new URLSearchParams({
    channel: 'whatsapp',
    source: '919940037999', // Your approved sender number
    destination: to, // Ex: '919xxxxxxxxx'
    'src.name': 'disenosys',
    template: JSON.stringify({
      id: '8e6841ee-b835-4cc7-9d03-1c75fc368c5e',
      params: ['John,', 'Jan'], // Dynamic values
    }),
  });

  try {
    const response = await axios.post(
      'https://api.gupshup.io/wa/api/v1/template/msg',
      data,
      { headers }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Error sending message:', error?.response?.data || error.message);
    res.status(500).json({ success: false, error: error?.response?.data || error.message });
  }
};

