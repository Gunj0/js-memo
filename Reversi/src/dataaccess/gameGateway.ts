import mysql from "mysql2/promise";
import { GameRecord } from "./gameRecord";

export class GameGateway {
  async findLatest(conn: mysql.Connection): Promise<GameRecord | undefined> {
    const gameSelectResult = await conn.execute<mysql.RowDataPacket[]>(
      "SELECT id, started_at FROM games ORDER BY id DESC LIMIT 1"
    );
    const record = gameSelectResult[0][0];

    if (!record) {
      return undefined;
    }
    return new GameRecord(record["id"], record["started_at"]);
  }

  async insert(conn: mysql.Connection, startedAt: Date): Promise<GameRecord> {
    const gameInsertResult = await conn.execute<mysql.ResultSetHeader>(
      "INSERT INTO games (started_at) VALUES (?)",
      [startedAt]
    );
    const gameId = gameInsertResult[0].insertId;

    return new GameRecord(gameId, startedAt);
  }
}
