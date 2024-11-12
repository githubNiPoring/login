const database = require("../../src/database");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // First check if username already exists
    const [existingUsers] = await database.query(
      `SELECT * FROM accounts WHERE username = ?`,
      [username]
    );

    // Check if any users were found
    if (existingUsers.length > 0) {
      return res.status(409).send({
        success: false,
        message: "Username already exists",
      });
    }

    // If username doesn't exist, proceed with registration
    await database.query(
      `INSERT INTO accounts (username, password) VALUES (?, ?)`,
      [username, password]
    );

    res.status(201).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      err,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = await database.query(
      `SELECT * FROM accounts WHERE username = ? AND password = ?`,
      [username, password]
    );

    if (!query[0].length) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }

    req.session.loggedin = true;
    req.session.username = username;

    res.status(200).send({
      success: true,
      message: "logged in",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      err,
    });
  }
};

module.exports = { register, login };
