const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const events = require("../models/events");
const special = require("../models/special");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Router");
});

router.post("/login", (req, res) => {
  console.log("Request Recieved");
  let userData = req.body;
  console.log(userData);
  user.findOne({ email: userData.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      } else if (userData.password != user.password) {
        res.status(401).send("Invalid Password");
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "secretkey");
        res.status(200).send({ token });
      }
    }
  });
});

router.post("/register", (req, res) => {
  let userData = req.body;
  console.log(userData);
  let u = new user(userData);
  u.save((err, registeredUser) => {
    if (err) {
      console.log(err);
      res.status(401).send("User already exits");
    } else {
      let payload = { subject: registeredUser._id };
      let token = jwt.sign(payload, "secretkey");
      res.status(200).send({ token });
    }
  });
});

router.post("/events", (req, res) => {
  let eventData = req.body;
  let e = new events(eventData);
  e.save((err, registeredUser) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).send(registeredUser);
    }
  });
});

router.get("/events", (req, res) => {
  let e = events.find({}, (err, ev) => {
    console.log(ev);
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(ev);
    }
  });
});

router.get("/special", (req, res) => {
  let e = special.find({}, (err, ev) => {
    console.log(ev);
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(ev);
    }
  });
});

router.post("/special", (req, res) => {
  let specialData = req.body;
  let s = new special(specialData);
  s.save((err, registeredUser) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).send(registeredUser);
    }
  });
});

module.exports = router;
