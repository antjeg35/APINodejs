const express = require("express");
const { check } = require("express-validator");

const feedController = require("../controllers/feedController");
const isAuth = require("../middleware/is_auth");

const router = express.Router();

// GET /feed/posts (retrieve all posts)
router.get("/posts", isAuth, feedController.getPosts);

// POST /feed/post (insert one post)
router.post(
  "/post",
  isAuth,
  [
    check("title").trim().isLength({ min: 5 }),
    check("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

// GET /feed/post/id  (retrieve the post for read)
router.get("/post/:postId", isAuth, feedController.getPost);

// PUT /feed/post/id (update one post)
router.put(
  "/post/:postId",
  isAuth,
  [
    check("title").trim().isLength({ min: 5 }),
    check("content").trim().isLength({ min: 5 }),
  ],
  feedController.updatePost
);

// DELETE /feed/post/id  (delete one post)
router.delete('/post/:postId', isAuth, feedController.deletePost);

module.exports = router;
