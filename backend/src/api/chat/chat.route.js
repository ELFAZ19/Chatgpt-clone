import express from "express";
const chatRouter = express.Router();

import {createConversationsController, getConversationsController} from "./controller/chat.controller.js";



chatRouter.post("/conversations", createConversationsController);



chatRouter.get("/conversations", getConversationsController);



export default chatRouter;
