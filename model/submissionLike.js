const mongoose = require("mongoose");
const Submission = require("./submission");
const User = require("./user");
const submissionLikeSchema = new mongoose.Schema({
    submission: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Submission
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
});

module.exports = mongoose.model('SubmissionLike', submissionLikeSchema);