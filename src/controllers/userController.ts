import User from '../models/User.js';
import { Request, Response } from 'express';

export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
        res.json({ message: 'this user has been deleted' });
        console.log(deletedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const updateUser = async (req: Request, res: Response) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true},
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}
export const addFriend = async (req: Request, res: Response) => {
    try {
        const friend = await User.findOneAndUpdate(
          { _id: req.params.userId },
            {
                $addToSet: {
                    friends: req.body } },
            { runValidators: true, new: true }
        );
        if (!friend) {
            res.status(404).json({ message: 'no friend to add' });
        } else {
            res.json({ message: 'friend added!' });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
export const removeFriend = async (req: Request, res: Response) => {
    try {
        const removedFriend = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
          { new: true }
        );
        if (!removedFriend) {
            res.status(404).json({message: 'no friend to remove'})
        } else {
            res.json({message: 'friend removed :('})
        }
        
    } catch (err) {
        res.status(500).json(err);
    }
}