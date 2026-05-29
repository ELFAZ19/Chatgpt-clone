

import express from "express";
import chatRouter from "./chat/chat.route.js";

const mainRouter = express.Router();



mainRouter.use('/chat', chatRouter);


export default mainRouter;


