import {
  createConversationService,
  getRecentConversationsServiceRows,
} from "../service/chat.service.js";

import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

const geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function createConversationsController(req, res, next) {
  try {
    const body = req.body || {};
    const question = body.question ?? body.questions;

    if (!question || (typeof question === "string" && !question.trim())) {
      return res.status(400).json({
        success: false,
        message: "Missing required field: question",
      });
    }

    const result = await createConversationService(
      Array.isArray(question) ? question.join("\n") : question,
    );
    res.status(201).json({
      success: true,
      message: "Conversation created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}


export async function getConversationsController(req, res, next) {
  try {
    const rows = await getRecentConversationsServiceRows(50);
    const conversations = rows.map((row) => ({
      id: row.id,
      role: row.role,
      content: row.content,
    }));
    res.status(200).json({
      success: true,
      message: "Conversations retrieved successfully",
      data: { conversations },
    });
  } catch (error) {
    next(error);
  }
}
