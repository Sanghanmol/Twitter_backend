import { handleerroror } from "../erroror.js";
import User from "../models/User.js";
import Tweet from "../models/Tweet.js";

export const getUser = async (req, resp, next) => {
  try {
    const user = await User.findById(req.params.id);
    resp.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
export const update = async (req, resp, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      resp.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createerroror(403, "You can update only your account"));
  }
};
export const deleteUser = async (req, resp, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      await Tweet.remove({ userId: req.params.id });

      resp.status(200).json("User delete");
    } catch (error) {
      next(error);
    }
  } else {
    return next(handleerroror(403, "You can only delete your own account"));
  }
};

export const follow = async (req, resp, next) => {
  try {
    //user
    const user = await User.findById(req.params.id);
    //current user
    const currentUser = await User.findById(req.body.id);

    if (!user.followers.includes(req.body.id)) {
      await user.updateOne({
        $push: { followers: req.body.id },
      });

      await currentUser.updateOne({ $push: { following: req.params.id } });
    } else {
      resp.status(403).json("you already follow this user");
    }
    resp.status(200).json("following the user");
  } catch (error) {
    next(error);
  }
};
export const unFollow = async (req, resp, next) => {
  try {
    //user
    const user = await User.findById(req.params.id);
    //current user
    const currentUser = await User.findById(req.body.id);

    if (currentUser.following.includes(req.params.id)) {
      await user.updateOne({
        $pull: { followers: req.body.id },
      });

      await currentUser.updateOne({ $pull: { following: req.params.id } });
    } else {
      resp.status(403).json("you are not following this user");
    }
    resp.status(200).json("unfollowing the user");
  } catch (error) {
    next(error);
  }
};
