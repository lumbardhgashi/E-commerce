import express from "express";
import { currentUser, requireAuth, validateRequest } from "@aaecomm/common";
import { User } from "../models/user";

const router = express.Router();

router.get('/api/users', currentUser, requireAuth("user"), validateRequest, async (req, res) => {

    const users = await User.findAll()

    res.send(users)
})

export {router as indexUserRouter}