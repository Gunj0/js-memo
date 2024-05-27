import { GameResult } from "./gameResult";
import mysql from "mysql2/promise";

export interface GameResultRepository {
  findForGameId(
    conn: mysql.Connection,
    gameId: number
  ): Promise<GameResult | undefined>;

  save(conn: mysql.Connection, gameResult: GameResult): Promise<void>;
}
