import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  getUser,
  update,
  deleteUser,
  follow,
  unFollow,
} from "../controllers/user.js";

const router = express.Router();

// Get User
router.get("/find/:id", getUser);

// Update User
router.put("/:id", verifyToken, update);

// Delete User
router.delete("/:id", verifyToken, deleteUser);

// Follow
router.put("/follow/:id", verifyToken, follow);

// Unfollow
router.put("/unfollow/:id", verifyToken, unFollow);

export default router;
