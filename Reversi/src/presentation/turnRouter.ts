import express from "express";
import { TurnService } from "../application/service/turnService";
import { Point } from "../domain/model/turn/point";
import { toDisc } from "../domain/model/turn/disc";

export const turnRouter = express.Router();

const turnService = new TurnService();

interface TurnGetResponseBody {
  turnCount: number;
  board: number[][];
  nextDisc: number | null;
  winnerDisc: number | null;
}

interface TurnPostRequestBody {
  turnCount: number;
  move: {
    disc: number;
    x: number;
    y: number;
  };
}

// 盤面の取得
turnRouter.get(
  "/api/games/latest/turns/:turnCount",
  async (req, res: express.Response<TurnGetResponseBody>) => {
    const turnCount = parseInt(req.params.turnCount);

    const output = await turnService.findLatestGameTurnByTurnCount(turnCount);

    const responseBody = {
      turnCount: output.turnCount,
      board: output.board,
      nextDisc: output.nextDisc ?? null,
      winnerDisc: output.winnerDisc ?? null,
    };

    res.json(responseBody);
  }
);

// ターンの登録
turnRouter.post(
  "/api/games/latest/turns",
  async (req: express.Request<{}, {}, TurnPostRequestBody>, res) => {
    const turnCount = req.body.turnCount;
    const disc = toDisc(req.body.move.disc);
    const point = new Point(req.body.move.x, req.body.move.y);

    await turnService.registerTurn(turnCount, disc, point);

    res.status(201).end();
  }
);
