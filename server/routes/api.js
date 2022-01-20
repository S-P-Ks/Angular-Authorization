const express = require("express");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const events = require("../models/events");
const special = require("../models/special");
const bcrypt = require("bcrypt");
const router = express.Router();

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized Access");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token == null) {
    res.status(401).send("Unathorized Access");
  }
  let payload = jwt.verify(token, "secretkey");
  if (!payload) {
    res.status(401).send("Unathorized Access");
  }

  console.log(payload);
  req.user = payload.subject;
  next();
}

router.get("/", (req, res) => {
  res.send("Router");
});

router.post("/login", async (req, res) => {
  console.log("Request Recieved");
  let userData = req.body;
  console.log(userData);
  user.findOne({ email: userData.email }, async (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (!user) {
        res.status(401).send("Invalid email");
      }

      console.log(user);

      let passMatch = await bcrypt.compare(userData.password, user.password);

      if (!passMatch) {
        res.status(401).send("Invalid Password");
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "secretkey");
        res.status(200).send({ token });
      }
    }
  });
});

router.post("/register", async (req, res) => {
  let userData = req.body;
  console.log(userData);
  let password = await bcrypt.hash(userData.password, 10);
  console.log(password);
  userData.password = password;
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

router.get("/special", verifyToken, (req, res) => {
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
