const mongoose = require('mongoose');

const blockedEventSchema = new mongoose.Schema({
    eventId: { type: String, required: true }, // The unique ID for the event from the calendar
    subject: { type: String, required: true }, // The subject of the event (e.g., meeting title)
    startTimeUTC: { type: String, required: true }, // Start time in UTC format
    endTimeUTC: { type: String, required: true }, // End time in UTC format
    userId: { type: String, required: true }, // Calendar user's ID
}, { timestamps: true });

const BlockedEvent = mongoose.model('BlockedEvent', blockedEventSchema);

module.exports = { BlockedEvent };
