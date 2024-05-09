import express from "express";
import { GameService } from "../application/gameService";

export const gameRouter = express.Router();

const gameService = new GameService();

// 対戦開始
gameRouter.post("/api/games", async (req, res) => {
  await gameService.startNewGame();
  res.status(201).end();
});
