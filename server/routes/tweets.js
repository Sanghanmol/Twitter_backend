import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createTweet,
  deleteTweet,
  likeOrDislike,
  getAllTweets,
  getUserTweets,
  getExploreTweets,
} from "../controllers/tweet.js";

const router = express.Router();

// Create a Tweet
router.post("/", verifyToken, createTweet);

// Delete a Tweet
router.delete("/:id", verifyToken, deleteTweet);

// Like or Dislike a Tweet
router.put("/like/:id", likeOrDislike);

// get all timeline tweets
router.get("/timeline/:id", getAllTweets);

// get user Tweets only
router.get("/user/all/:id", getUserTweets);

//explore all tweets
router.get("/explore", getExploreTweets);

export default router;
