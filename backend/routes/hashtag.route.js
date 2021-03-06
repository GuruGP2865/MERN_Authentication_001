const express = require("express");
const router = express.Router();


const {
  requireSignin,
  requireAuthentication,
  adminMiddleware,
} = require("../controllers/auth.controller");

const { getUserById } = require("../controllers/user.controller");

const { getHashtagById, 
        createHashtag, 
        getAllHashtag, 
        getHashtag, 
        updateHashtag, 
        removeHashtag, } = require("../controllers/hashtag.controller");

router.param("userId", getUserById);
router.param("hashtagId", getHashtagById);

router.post("/hashtag/create/:userId", 
            requireSignin, 
            requireAuthentication, 
            adminMiddleware,
            createHashtag)

router.get("/hashtags", getAllHashtag);
router.get("/hashtag/:hashtagId", getHashtag);

router.put("/hashtag/:hashtagId/:userId", 
           requireSignin, 
           requireAuthentication, 
           adminMiddleware, 
           updateHashtag);

router.delete("/hashtag/:hashtagId/:userId", 
              requireSignin, 
              requireAuthentication, 
              adminMiddleware, 
              removeHashtag);

module.exports = router;              