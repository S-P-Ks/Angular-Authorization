const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const specialSchema = new Schema({
  name: String,
  description: String,
  date: Date,
});

module.exports = mongoose.model("special", specialSchema, "Special");
