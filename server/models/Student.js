const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  studentNumber: String,
  password: String,
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  phoneNumber: String,
  email: String,
  program: String,
});

module.exports = mongoose.model("Student", StudentSchema);
