const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkowtSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  

  exercises: [
    // {
    //   type: String,
    //   name: String,  
    //   weight: Number,
    //   sets: Number,
    //   reps: Number,
    //   duration: Number,
    //   distance: Number
    // }
  ]
  },

    {
      toJSON: {
        virtuals: true
      }

  },
  


);

WorkowtSchema.virtual("totalDuration").get(function () {
  let total = 0;
  this.exercises.forEach(exercise => {
    total += exercise.duration;
  });
  return total;

})

// const WorkowtSchema = new Schema({
//   exercises: [ExerciseSchema]
// });

const Workowt = mongoose.model("Workowt", WorkowtSchema);

module.exports = Workowt;
