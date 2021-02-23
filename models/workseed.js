const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkowtSchema = new Schema({
exercises: [
    {
        type: String,
        name: String,  
        weight: Number,
        sets: Number,
        reps: Number,
        duration: Number,
        distance: Number   
    }
]
});

const Workowt = mongoose.model("Workowt", WorkowtSchema);

module.exports = Workowt;
