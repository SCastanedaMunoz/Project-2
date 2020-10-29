const express = require("express");

const db = require("../models");

const router = express.Router();

router.get("/api/people", (req, res) => {
  db.Person.findAll().then((dbPeople) => {
    res.json(dbPeople);
  });
});

router.get("/api/people/:status", (req, res) => {
  const { status } = req.params;
  db.Person.count({
    where: {
      status: status,
    },
    attributes: ["country", "city", "state"],
    col: "city",
    group: ["country", "city", "state"],
  }).then((dbPeople) => {
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
