const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/**
 * @typedef {Object} User
 * @property {string} email - The email of the user.
 * @property {string} password - The hashed password of the user.
 */

/**
 * Creates a new user with a hashed password.
 *
 * @async
 * @function createUser
 * @param {string} email - The email of the user to create.
 * @param {string} password - The password of the user to create.
 * @returns {Promise<User>} The created user.
 */
const createUser = async (email, password) => {
  const hash = await bcrypt.hash(password, 10);
  const user = new User({
    email: email,
    password: hash,
  });
  await user.save();
  return user;
};

/**
 * @typedef {Object} TokenPayload
 * @property {string} userId - The ID of the user.
 */

/**
 * Creates a JWT token for a user.
 *
 * @function createToken
 * @param {TokenPayload} payload - The payload containing the user ID.
 * @returns {string} The generated JWT token.
 */
const createToken = ({ userId }) => {
  return jwt.sign({ userId: userId }, process.env.RANDOM_TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

/**
 * @typedef {Object} AuthenticatedUser
 * @property {string} _id - The id of the user.
 */

/**
 * Authenticates a user based on email and password.
 *
 * @async
 * @function authUser
 * @param {string} email - The email of the user to authenticate.
 * @param {string} password - The password of the user to authenticate.
 * @returns {Promise<{user: AuthenticatedUser, token: string}>} An object containing the authenticated user and a token.
 * @throws {Error} If the user is not found or the password is incorrect.
 */
const authUser = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
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
