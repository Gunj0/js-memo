import { GameResultGateway } from "./gameResultGateway";
import { GameResult } from "../../../domain/model/gameResult/gameResult";
import mysql from "mysql2/promise";
import { toWinnerDisc } from "../../../domain/model/gameResult/winnerDisc";
import { GameResultRepository } from "../../../domain/model/gameResult/gameResultRepository";

const gameResultGateway = new GameResultGateway();

export class GameResultMySQLRepository implements GameResultRepository {
  async findForGameId(
    conn: mysql.Connection,
    gameId: number
  ): Promise<GameResult | undefined> {
    const gameResultRecord = await gameResultGateway.findForGameId(
      conn,
      gameId
    );

    if (!gameResultRecord) {
      return undefined;
    }

    return new GameResult(
      gameResultRecord.gameId,
      toWinnerDisc(gameResultRecord.winnerDisc),
      gameResultRecord.endAt
    );
  }

  async save(conn: mysql.Connection, gameResult: GameResult) {
    await gameResultGateway.insert(
      conn,
      gameResult.gameId,
      gameResult.winnerDisc,
      gameResult.endAt
    );
  }
}
