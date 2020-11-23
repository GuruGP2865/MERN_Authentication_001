const User = require("../models/auth.model");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user was found ",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  return res.json({
    _id: req.profile._id,
    name: req.profile.name,
    email: req.profile.email,
    createdAt: req.profile.createdAt
  });
}

exports.getAllUsers = (req, res) => {
  User.find().select("_id name email role posts").populate("posts").exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong"
      })
    }

    return res.status(200).json(users);
  })
}


exports.getAllAdmins =  (req, res) => {
  User.find({ role : "Admin"}).select("_id name email role posts").populate("posts").exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong"
      })
    }

    return res.status(200).json(users);
  })
}