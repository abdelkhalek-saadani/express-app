require("dotenv").config();

jest.mock('../../connections/usersDatabase');
jest.mock('../../models/user');

const { createToken } = require('../userService');
const jwt = require('jsonwebtoken');




describe('createToken', () => {
  test('should create a valid token', () => {
    const token = createToken({userId: "010101"});
    const decoded = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    expect(decoded.userId).toBe("010101");
  });

  test('should throw an error', () => {
    const token = createToken({userId: "010101"});
    expect(() => jwt.verify(token, "wrong secret")).toThrow();
  });
});
