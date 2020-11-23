const express = require("express");
const router = express.Router();

const {
  requireSignin,
  requireAuthentication,
  adminMiddleware,
} = require("../controllers/auth.controller");

const {
  getPostById,
  getPostBySlug,
  getPost,
  updatePost,
  createPost,
  removePost,
  getAllPosts,
  uploadFile,
} = require("../controllers/post.controller");

const { getUserById } = require("../controllers/user.controller");

router.param("postId", getPostById);
router.param("postSlug", getPostBySlug);
router.param("userId", getUserById);

router.get("/post/:postSlug", getPostBySlug, getPost);
router.get("/posts", getAllPosts);

router.post(
  "/post/create/:userId",
  requireSignin,
  requireAuthentication,
  adminMiddleware,
  createPost
);

//upload image in server
router.post(
  "/post/uploadfile/:userId",
  requireSignin,
  requireAuthentication,
  adminMiddleware,
  uploadFile
);

router.put(
  "/post/:postId/:userId",
  requireSignin,
  requireAuthentication,
  adminMiddleware,
  updatePost
);

router.delete(
  "/post/remove/:postId/:userId",
  requireSignin,
  requireAuthentication,
  adminMiddleware,
  removePost
);

//export router
module.exports = router;
