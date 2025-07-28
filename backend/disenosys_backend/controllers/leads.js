const Leads = require("../models/leads.js");
const sendLeadToWhatsapp = require("../utils/WhatsappApi.js");


exports.handleLeadSubmission = async (req, res) => {
    console.log(req.body)
  try {
    const {
      fullName,
      phone,
      email,
      linkedin,
      currentCompany,
      currentDesignation,
      currentCTC,
      expectedCTC,
      noticePeriod,
      noticeNegotiable,
      currentLocation,
      willingToRelocate,
      preferredLocation,
      experience,
      engagementType,
      urgency,
      message,
    } = req.body;

    const resume = req.file?.filename;
    
    const data = new Leads({
      fullName,
      phone,
      email,
      linkedin,
      currentCompany,
      currentDesignation,
      currentCTC,
      expectedCTC,
      noticePeriod,
      noticeNegotiable,
      currentLocation,
      willingToRelocate,
      preferredLocation,
      experience,
      engagementType,
      urgency,
      message,
      resume:resume
    })
    console.log(data)
    await data.save();
    await sendLeadToWhatsapp(data);

    return res.status(200).json({ message: "Data captured successfully!",data });
  } catch (error) {
    console.error("Lead submit error:", error);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};




exports.postHook = async (req, res) => {
  try {
    const payload = req.body;
    const replyId = payload?.payload?.reply?.id;

    if (!replyId) return res.sendStatus(200);

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

