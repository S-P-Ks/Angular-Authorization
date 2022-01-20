const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  description: String,
  date: Date,
});

module.exports = mongoose.model("events", eventSchema, "Events");
