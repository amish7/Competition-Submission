const mongoose = require("mongoose");
const User = require("./model/user");
const Competition = require("./model/competition");
const Submission = require("./model/submission");
const SubmissionLike = require("./model/submissionLike");
const data1 = require("./user.json");

const dbUrl = "mongodb://localhost:27017/ybox";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTED TO DATABASE");
    })
    .catch((e) => {
        console.log(e);
        console.log("CONNECTION FAILED");
    });


const seedDb = async () => {
    for (let i of data1) {
        await User.insertMany(i);
    }
    for (let i = 1; i <= 50; i++) {
        let user;
        if (i % 5 == 0) {
            user = await User.findOne({ "name": "Amish" });
        }
        else if (i % 5 == 1) {
            user = await User.findOne({ "name": "Shyam" });
        }
        else if (i % 5 == 2) {
            user = await User.findOne({ "name": "Bob" });
        }
        else if (i % 5 == 3) {
            user = await User.findOne({ "name": "Jai" });
        }
        else if (i % 5 == 4) {
            user = await User.findOne({ "name": "Ram" });
        }
        const competition = new Competition({
            name: `Competition${i}`,
            description: `Sample${i}`,
            author: user
        });
        await Competition.insertMany(competition);
    }
    for (let i = 1; i <= 300; i++) {
        let user, competition, image;
        if (i % 5 == 4) {
            user = await User.findOne({ "name": "Amish" });
            image = "https://i.pinimg.com/originals/a7/3d/6e/a73d6e4ac85c6a822841e449b24c78e1.jpg"
        }
        else if (i % 5 == 3) {
            user = await User.findOne({ "name": "Shyam" });
            image = "https://images.pexels.com/photos/1172064/pexels-photo-1172064.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
        else if (i % 5 == 2) {
            user = await User.findOne({ "name": "Bob" });
            image = "https://i.pinimg.com/originals/31/38/11/313811274a28746379ebf4d4fcf7842b.jpg";
        }
        else if (i % 5 == 1) {
            user = await User.findOne({ "name": "Jai" });
            image = "https://www.iucn.org/sites/dev/files/styles/850x500_no_menu_article/public/blue-morpho-350x150-matthiasfr-pixabay-crop.jpg?itok=Y8DXROpH"
        }
        else if (i % 5 == 0) {
            user = await User.findOne({ "name": "Ram" });
            image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdVWrih6zANlwDsz4a1qkWvnYPX4Y-67XM7A&usqp=CAU"
        }
        let val = (i % 50) + 1;
        competition = await Competition.findOne({ "name": `Competition${val}` });
        const submission = new Submission({
            author: user,
            competition: competition,
            image: image
        })
        await Submission.insertMany(submission);
    }
    for (let i = 1; i <= 1000; i++) {
        const submission = await Submission.find().limit(-1).skip(Math.floor(Math.random() * 300));
        const author = await User.find().limit(-1).skip(Math.floor(Math.random() * 5));
        const submissionLike = new SubmissionLike({
            author: author[0],
            submission: submission[0]
        })
        await SubmissionLike.insertMany(submissionLike);
    }
}
seedDb().then(() => {
    mongoose.connection.close();
})