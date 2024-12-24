const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (email, password) => {
  const hash = await bcrypt.hash(password, 10);
  const user = new User({
    email: email,
    password: hash,
  });
  await user.save();
  return user;
};

const createToken = ({ userId }) => {
  return jwt.sign({ userId: userId }, process.env.RANDOM_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

/**
 * Authenticates a user based on email and password.
 *
 * @async
 * @function authUser
 * @param {string} email - The email of the user to authenticate.
 * @param {string} password - The password of the user to authenticate.
 * @returns {Promise<{user: Object, token: Object}>} An object containing the authenticated user and a token.
 * @throws {Error} If the user is not found or the password is incorrect.
 */
const authUser = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    console.log("User not found!");
    throw new Error("User not found!");
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    throw new Error("Incorrect mail or password!");
  }

  const token = createToken({ userId: user._id });

  return { user, token };
};

module.exports = { createUser, createToken, authUser };
