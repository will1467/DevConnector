const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const User = require("../models/User");
const auth = require("../../middleware/auth");
const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator");

//get user profile

router.get("/me", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res.status(400).json({ errors: [{ msg: "There is no profile for this user" }] });
        }
        res.json({ profile });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//get all profiles
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "avatar"]);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//get profile by user id
router.get("/user/:user_id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);
        if (!profile) {
            return res.status(400).json({ errors: [{ msg: "Profile not found" }] });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Delete profile & user & posts
router.delete("/", auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({ user: req.user.id });
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: "User Deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//create profile
router.post(
    "/",
    [
        auth,
        [
            check("status", "Status is required")
                .not()
                .isEmpty(),
            check("skills", "Skills is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        var data = req.body;
        let profileFields = {};
        profileFields.user = req.user.id;
        if (data.company) profileFields.company = data.company;
        if (data.website) profileFields.website = data.website;
        if (data.location) profileFields.location = data.location;
        if (data.bio) profileFields.bio = data.bio;
        if (data.status) profileFields.status = data.status;
        if (data.githubusername) profileFields.githubusername = data.githubusername;

        if (data.skills) {
            profileFields.skills = data.skills.split(",").map(skill => {
                return skill.trim();
            });
        }

        profileFields.social = {};
        if (data.youtube) profileFields.social.youtube = data.youtube;
        if (data.twitter) profileFields.social.twitter = data.twitter;
        if (data.facebook) profileFields.social.facebook = data.facebook;
        if (data.linkedin) profileFields.social.linkedin = data.linkedin;
        if (data.instagram) profileFields.social.instagram = data.instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            if (profile) {
                //Update
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
                return res.json(profile);
            }

            //Create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//add experience (via put request)
router.put(
    "/experience",
    [
        auth,
        [
            check("title", "Title is required")
                .not()
                .isEmpty(),
            check("company", "Company is required")
                .not()
                .isEmpty(),
            check("from", "From Date is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let data = req.body;
        let newExp = {
            title: data.title,
            company: data.company,
            location: data.location,
            from: data.from,
            to: data.to,
            current: data.current,
            description: data.description
        };

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//remove an experience

router.delete("/experience/:exp_id", auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        let aItems = profile.experience.map(item => {
            return item.id;
        });
        let removeIndex = aItems.indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);
        await profile.save();
        res.json({ msg: "Experience removed successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//add education (via put req)
router.put(
    "/education",
    [
        auth,
        [
            check("school", "School is required")
                .not()
                .isEmpty(),
            check("degree", "Degree is required")
                .not()
                .isEmpty(),
            check("from", "From Date is required")
                .not()
                .isEmpty(),
            check("fieldofstudy", "Field of Study is required")
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let data = req.body;
        let newEdu = {
            school: data.school,
            fieldofstudy: data.fieldofstudy,
            degree: data.degree,
            from: data.from,
            to: data.to,
            current: data.current,
            description: data.description
        };

        try {
            let profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(newEdu);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

//remove an education

router.delete("/education/:exp_id", auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });
        let aItems = profile.education.map(item => {
            return item.id;
        });
        let removeIndex = aItems.indexOf(req.params.exp_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        res.json({ msg: "Education removed successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//get user github repos

router.get("/github/:username", async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc
            &client_id=${config.get("githubclientID")}&client_secret=${config.get("githubclientSecret")}`,
            method: "GET",
            headers: { "user-agent": "node.js" }
        };
        request(options, (error, response, body) => {
            if (error) console.log(error);
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: "No Github profile found" });
            }

            res.json(JSON.parse(body));
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
