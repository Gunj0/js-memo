import mysql from "mysql2/promise";
import { Game } from "./game";

export interface GameRepository {
  findLatest(conn: mysql.Connection): Promise<Game | undefined>;
  save(conn: mysql.Connection, game: Game): Promise<Game>;
}
