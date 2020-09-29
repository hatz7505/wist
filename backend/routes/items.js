const express = require("express");
const ExpressError = require("../helpers/expressError");
const Item = require("../models/item");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const router = new express.Router();

router.post("/", async function (req, res, next) {
  try {
    const result = await Item.create(req.body);
    return res.json({ result });
  } catch (err) {
    next(err);
  }
});

router.get("/:username", async function (req, res, next) {
  try {
    let username = req.params.username;
    let items = await Item.getUsersItems(username);
    return res.json({ items });
  } catch (err) {
    next(err);
  }
});

router.get("/pros/:itemId", async function (req, res, next) {
  try {
    let itemId = req.params.itemId;
    let pros = await Item.getPros(itemId);
    return res.json({ pros });
  } catch (err) {
    next(err);
  }
});

router.get("/cons/:itemId", async function (req, res, next) {
  try {
    let itemId = req.params.itemId;
    let cons = await Item.getCons(itemId);
    return res.json({ cons });
  } catch (err) {
    next(err);
  }
});

router.post("/procons", async function (req, res, next) {
  try {
    const result = await Item.addProCon(req.body);
    return res.json({ result });
  } catch (err) {
    next(err);
  }
});

router.delete("/:itemId", async function (req, res, next) {
  try {
    let itemId = req.params.itemId;
    let result = await Item.delete(itemId);
    return res.json({ result });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
