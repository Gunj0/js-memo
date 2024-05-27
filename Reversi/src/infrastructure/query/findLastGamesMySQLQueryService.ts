import mysql from "mysql2/promise";
import {
  FindLastGamesQueryModel,
  FindLastGamesQueryService,
} from "../../application/query/findLastGamesQueryService";

export class FindLastGamesMySQLQueryService
  implements FindLastGamesQueryService
{
  async query(
    conn: mysql.Connection,
    limit: number
  ): Promise<FindLastGamesQueryModel[]> {
    const selectResult = await conn.execute<mysql.RowDataPacket[]>(
      `
SELECT
  MAX(g.id) AS game_id,
  SUM(CASE WHEN m.disc = 1 THEN 1 ELSE 0 END) AS dark_move_count,
  SUM(CASE WHEN m.disc = 2 THEN 1 ELSE 0 END) AS light_move_count,
  MAX(gr.winner_disc) AS winner_disc,
  MAX(g.started_at) AS started_at,
  MAX(gr.end_at) AS end_at
FROM games g
LEFT JOIN game_results gr ON gr.game_id = g.id
LEFT JOIN turns t ON t.game_id = g.id
LEFT JOIN moves m ON m.turn_id = t.id
GROUP BY g.id
ORDER BY g.id DESC
LIMIT ?
`,
      [limit.toString()]
    );
    const records = selectResult[0];

    return records.map((r) => {
      return new FindLastGamesQueryModel(
        r["game_id"],
        r["dark_move_count"],
        r["light_move_count"],
        r["winner_disc"],
        r["started_at"],
        r["end_at"]
      );
    });
  }
}
