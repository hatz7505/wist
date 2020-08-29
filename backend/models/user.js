const db = require("../db");
const ExpressError = require("../helpers/expressError");
const bcrypt = require("bcrypt");

class User {
  static async create({
    username,
    password,
    firstName,
    lastName,
    email
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    let result = await db.query(
      `INSERT INTO users (username, password, first_name, last_name, email)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING username, password, first_name, last_name, email`,
      [
        username,
        hashedPassword,
        firstName,
        lastName,
        email
      ]
    );
    return result.rows[0];
  }

  static async getByUsername(username) {
    let result = await db.query(
      `SELECT username, first_name, last_name, email, password FROM users
      WHERE username=$1`,
      [username]
    );
    if (result.rows.length === 0) {
      throw new ExpressError("Username does not exist", 404);
    }
    return result.rows[0];
  }
}
module.exports = User;
