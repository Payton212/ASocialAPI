import { Thought, User } from "../models/index.js";
import { Request, Response } from "express";

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId }).select(
      "-__v"
    );
    if (!thought) {
      res.status(404).json({ message: "no thought found" });
    } else {
      res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const newThought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: newThought } },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: `Thought created but couldn't find User` });
    }
    return res
      .status(201)
      .json({ message: "Thought created!", thought: newThought });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const deletedThought = await Thought.findOneAndDelete({
      _id: req.params.thoughtId,
    });
    if (!deletedThought) {
      res.status(404).json({ message: "no video to delete" });
    } else {
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: "no user found" });
      } else {
        res.json({ message: "thought deleted" });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export const updateThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!updatedThought) {
      res.status(404).json({ message: "no thought to update" });
    } else {
      res.json(updatedThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
export const addThoughtReaction = async (req: Request, res: Response) => {
  try {
    const addThoughtReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    if (!addThoughtReaction) {
      res.status(404).json({ message: "no thought found" });
    } else {
      res.json(addThoughtReaction);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeThoughtReaction = async (req: Request, res: Response) => {
  try {
    const removedThoughtReaction = await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$pull:  {reactions :{_id: req.params.reactionId }}},
      { new: true}
    )
    if (!removedThoughtReaction) {
     return res.status(404).json({})
    }
    return res.json(removedThoughtReaction);
  } catch (err) {
    return res.status(500).json(err);
  }
};

