const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  courseCode: String,
  courseName: String,
  section: String,
  semester: String,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
});

module.exports = mongoose.model("Course", CourseSchema);
