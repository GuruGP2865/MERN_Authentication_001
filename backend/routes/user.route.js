const express = require("express");
const router = express.Router();

const { getUserById, getAllUsers, getAllAdmins, getUser } = require("../controllers/user.controller");
const {
  requireSignin,
  requireAuthentication,
  adminMiddleware,
} = require("../controllers/auth.controller");

router.param("userId", getUserById)

router.get("/user/:userId", requireSignin, requireAuthentication, getUser);

router.get("/users/:userId", requireSignin, requireAuthentication, adminMiddleware, getAllUsers);

router.get("/admins/:userId", requireSignin, requireAuthentication, adminMiddleware, getAllAdmins)

module.exports = router;