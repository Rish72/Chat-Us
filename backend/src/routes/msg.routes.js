import express from "express";
import { getMsg, getUsersForSideBar, sendMsg } from "../controller/msg.controller.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const msgRouter = express.Router();

msgRouter.get("/users", protectedRoute ,getUsersForSideBar);
msgRouter.get("/:id", getMsg);

msgRouter.post("/send/id",protectedRoute, sendMsg)

export default msgRouter