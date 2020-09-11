const db = require("../db");
const ExpressError = require("../helpers/expressError");
const bcrypt = require("bcrypt");

class Item {
  static async create({ name, picture, price, category, link, username }) {
    let result = await db.query(
      `INSERT INTO items (name, picture, price, username, category, link)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING name, picture, price, username, category, link`,
      [name, picture, price, username, category, link]
    );
    return result.rows[0];
  }

}
module.exports = Item;
