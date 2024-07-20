
const {User} = require('../models/user');

exports.createUser = (req, res, next) => {
  
  const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });
    newUser
      .save()
      .then((user) => {
        console.log("user created successfully");
        res.status(201).json({ user });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  }