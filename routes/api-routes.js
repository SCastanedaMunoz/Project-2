const express = require("express");

const db = require("../models");

const router = express.Router();

router.get("/api/people", (req, res) => {
  db.Person.findAll().then((dbPeople) => {
    res.json(dbPeople);
  });
});

module.exports = router;
