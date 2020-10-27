const express = require("express");

const db = require("../models");

const router = express.Router();

router.get("/api/people", (req, res) => {
  db.Person.findAll().then((dbPeople) => {
    res.json(dbPeople);
  });
});

router.post("/api/people", (req, res) => {
  const person = req.body;
  db.Person.create(person).then((dbPeople) => {
    res.status(201).json({
      success: true,
      id: dbPeople.insertId,
    });
  });
});

module.exports = router;
