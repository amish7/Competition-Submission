const mongoose = require("mongoose");
const User = require("./user");
const competitionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    submissions: {
        type: Number
    }
});

module.exports = mongoose.model('Competition', competitionSchema);