import express from "express";
import { GameService } from "../application/service/gameService";
import { GameMySQLRepository } from "../infrastructure/repository/game/gameMySQLRepository";
import { TurnMySQLRepository } from "../infrastructure/repository/turn/turnMySQLRepository";

export const gameRouter = express.Router();

const gameService = new GameService(
  new GameMySQLRepository(),
  new TurnMySQLRepository()
);

// 対戦開始
gameRouter.post("/api/games", async (req, res) => {
  await gameService.startNewGame();
  res.status(201).end();
});
