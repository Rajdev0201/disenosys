const Leads = require("../models/leads.js");
// const sendLeadToWhatsapp = require("../utils/WhatsappApi.js");
const axios = require("axios");


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





exports.postHook = async (req, res) => {
  try {
    const message = req.body;
    const payload = message?.Payload || message?.payload;

    if (payload && typeof payload === 'string') {
      const [status, leadId] = payload.split('_');  // e.g., "interested_64ec54..."

      console.log('Lead Response:', { status, leadId });
    const lead = await Leads.findById(leadId);
    if (!lead) return res.status(404).json({ error: "Lead not found" });

    lead.status = status === "interested" ? "Interested" : "Not Interested";
    await lead.save();

    console.log(`✅ Lead ${leadId} updated to: ${lead.status}`);
      return res.status(200).json({ message: 'Received response', status, leadId });
    }

    res.status(200).json({ message: 'No valid payload found.' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Server error' });
  }

};

exports.getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;


    const query = {};

    // 🔍 Search condition
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // 📅 Date range filter (corrected)
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Make sure to include full end date

      query.createdAt = {
        $gte: start,
        $lte: end,
      };
    }

    console.log("Query:", query);

    // 🔄 Fetch filtered and paginated data
    const data = await Leads.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });


    // 📊 Count total records
    const total = await Leads.countDocuments(query);

    // ✅ Response
    return res.status(200).json({
      message: "Leads fetched successfully",
      data,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong", err });
  }
};

exports.getLeadsDownload = async(req,res) => {
  try{
     const data = await Leads.find();
     if(!data){
      return res.status(400).json({message:"not found the data"})
     }
     return res.status(200).json({message:"data received for download xl sheet",data})
  }catch(err){
      console.log(err)
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

