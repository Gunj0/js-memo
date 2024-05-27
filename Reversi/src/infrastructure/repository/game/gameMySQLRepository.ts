import mysql from "mysql2/promise";
import { Game } from "../../../domain/model/game/game";
import { GameGateway } from "./gameGateway";
import { GameRepository } from "../../../domain/model/game/gameRepository";

const gameGateway = new GameGateway();

export class GameMySQLRepository implements GameRepository {
  async findLatest(conn: mysql.Connection): Promise<Game | undefined> {
    const gameRecord = await gameGateway.findLatest(conn);

    if (!gameRecord) {
      return undefined;
    }

    return new Game(gameRecord.id, gameRecord.startedAt);
  }

  async save(conn: mysql.Connection, game: Game): Promise<Game> {
    const gameRecord = await gameGateway.insert(conn, game.startedAt);

    return new Game(gameRecord.id, gameRecord.startedAt);
  }
}
