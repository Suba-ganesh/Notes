const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true, unique: true },
    tags: { type: [String], default:[] },
    isPinned: {type:Boolean, default:false},
    userId: {type:String},
    createdOn: { type: Date, default: new Date().getTime() }
});

// Export the model correctly
module.exports = mongoose.model("Note", noteSchema);