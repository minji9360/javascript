import express from "express";

export const userRouter = express.Router();

const handleHome = (request, response) => response.send('user index');
const handleEdit = (request, response) => response.send('user edit');
const handlePassword = (request, response) => response.send('user password');

userRouter.get("/", handleHome);

userRouter.get("/edit", handleEdit);

userRouter.get("/password", handlePassword);
