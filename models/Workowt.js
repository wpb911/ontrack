const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: String,
  name: String,  
  weight: Number,
  sets: Number,
  reps: Number,
  duration: Number,
  distance: Number
  
});


const WorkowtSchema = new Schema({
  exercises: [ExerciseSchema]
});

const Workowt = mongoose.model("Workowt", WorkowtSchema);

module.exports = Workowt;
