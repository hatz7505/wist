const express = require("express");
const ExpressError = require("../helpers/expressError");
const Item = require("../models/item");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const router = new express.Router();

router.post("/", async function (req, res, next) {
  try {
    console.log(req.body)
    const result = await Item.create(req.body);
    return res.json({ result });
  } catch (err) {
    next(err);
  }
});



module.exports = router;
