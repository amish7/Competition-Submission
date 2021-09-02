const mongoose = require("mongoose");
const Competition = require("./competition");
const User = require("./user");
const submissionSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    competition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Competition
    },
    likes: {
        type: Number
    }
});

module.exports = mongoose.model('Submission', submissionSchema);