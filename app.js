const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Competition = require("./model/competition");
const User = require("./model/user");
const Submission = require("./model/submission");
const SubmissionLike = require("./model/submissionLike");

const dbUrl = "mongodb://localhost:27017/ybox";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTED TO DATABASE");
    })
    .catch((e) => {
        console.log(e);
        console.log("CONNECTION FAILED");
    });

app.get("/competitions", async (req, res) => {
    const allCompetitions = await Competition.find({}).populate("author");
    for (let curCompetition of allCompetitions) {
        const submissions = await Submission.find({ "competition": curCompetition });
        curCompetition.submissions = submissions.length
    }
    res.send(allCompetitions);
})
app.get("/competition/:id/submissions", async (req, res) => {
    const curCompetition = await Competition.findById(req.params.id);
    console.log(curCompetition);
    const submissions = await Submission.find({}).populate("competition", null, { _id: { $eq: curCompetition._id } });
    let competitionSubmissions = [];
    for (let submission of submissions) {
        if (submission.competition) {
            const likes = await SubmissionLike.find({}).populate("submission", null, { _id: { $eq: submission._id } });
            let count = 0;
            for (let like of likes) {
                if (like.submission) count++;
            }
            submission.likes = count;
            competitionSubmissions.push(submission)
        }
    }
    res.send(competitionSubmissions);
})
app.listen("3000", (req, res) => {
    console.log("Listening to port 3000");
})