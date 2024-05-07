import express from "express";
import morgan from "morgan";
import "express-async-errors";
import mysql from "mysql2/promise";
import { GameGateway } from "./dataaccess/gameGateway";

const EMPTY = 0;
const DARK = 1;
const LIGHT = 2;

const INITIAL_BOARD = [
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, DARK, LIGHT, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, LIGHT, DARK, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
];

const PORT = 3000;

// Express Webフレームワークを使用
const app = express();

// ログ出力ライブラリを使用(devは開発用の設定)
app.use(morgan("dev"));
// Expressで静的ページを返す設定
app.use(express.static("Reversi/static", { extensions: ["html"] }));
// jsonデータを受け取るための設定
app.use(express.json());

// ルーティングサンプル
app.get("/api/hello", async (req, res) => {
  res.json({
    message: "hello!",
  });
});

// エラーテスト用エンドポイント
app.get("/api/error", async (req, res) => {
  throw new Error("Error!");
});

const gameGateway = new GameGateway();

// 対戦開始
app.post("/api/games", async (req, res) => {
  const now = new Date();

  const conn = await connectMySql();
  try {
    await conn.beginTransaction();

    const gameInsertResult = await gameGateway.insert(conn, now);
    if (!gameInsertResult) {
      throw new Error("Fail to insert games!");
    }

    const gameId = gameInsertResult.id;

    const turnInsertResult = await conn.execute<mysql.ResultSetHeader>(
      "INSERT INTO turns (game_id, turn_count, next_disc, end_at) VALUES (?, ?, ?, ?)",
      [gameId, 0, DARK, now]
    );
    const turnId = turnInsertResult[0].insertId;

    const squareCount = INITIAL_BOARD.map((line) => line.length).reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    const squaresInsertSql =
      "INSERT INTO squares (turn_id, x, y, disc) VALUES " +
      Array.from(Array(squareCount))
        .map(() => "(?, ?, ?, ?)")
        .join(",");
    const squaresInsertValues: any[] = [];
    INITIAL_BOARD.forEach((line, y) => {
      line.forEach((disc, x) => {
        squaresInsertValues.push(turnId);
        squaresInsertValues.push(x);
        squaresInsertValues.push(y);
        squaresInsertValues.push(disc);
      });
    });
    await conn.execute(squaresInsertSql, squaresInsertValues);

    await conn.commit();
  } finally {
    await conn.end();
  }

  res.status(201).end();
});

// 盤面の取得
app.get("/api/games/latest/turns/:turnCount", async (req, res) => {
  const turnCount = parseInt(req.params.turnCount);
  const conn = await connectMySql();

  try {
    const gameSelectResult = await gameGateway.findLatest(conn);
    if (!gameSelectResult) {
      throw new Error("Fail to find game");
    }

    const turnSelectResult = await conn.execute<mysql.RowDataPacket[]>(
      "SELECT id, game_id, turn_count, next_disc, end_at FROM turns " +
        "WHERE game_id = ? AND turn_count = ?",
      [gameSelectResult.id, turnCount]
    );
    const turn = turnSelectResult[0][0];

    const squareSelectResult = await conn.execute<mysql.RowDataPacket[]>(
      "SELECT id, turn_id, x, y, disc FROM squares WHERE turn_id = ?",
      [turn["id"]]
    );
    const squares = squareSelectResult[0];
    const board = Array.from(Array(8)).map(() => Array.from(Array(8)));
    squares.forEach((s) => {
      board[s.y][s.x] = s.disc;
    });
    const responseBody = {
      turnCount,
      board,
      nextDisc: turn["next_disc"],
      // TODO: 決着がついている場合、game_resultテーブルから取得する
      winnerDisc: null,
    };
    res.json(responseBody);
  } finally {
    await conn.end();
  }
});

// ターンの登録
app.post("/api/games/latest/turns", async (req, res) => {
  const turnCount = parseInt(req.body.turnCount);
  const disc = parseInt(req.body.move.disc);
  const x = parseInt(req.body.move.x);
  const y = parseInt(req.body.move.y);

  // 1つ前のターンを取得する
  const conn = await connectMySql();
  try {
    const gameSelectResult = await conn.execute<mysql.RowDataPacket[]>(
      "SELECT id, started_at FROM games ORDER BY id DESC LIMIT 1"
    );
    const game = gameSelectResult[0][0];

    const previousTurnCount = turnCount - 1;
    const turnSelectResult = await conn.execute<mysql.RowDataPacket[]>(
      "SELECT id, game_id, turn_count, next_disc, end_at FROM turns " +
        "WHERE game_id = ? AND turn_count = ?",
      [game["id"], previousTurnCount]
    );
    const turn = turnSelectResult[0][0];

    const squareSelectResult = await conn.execute<mysql.RowDataPacket[]>(
      "SELECT id, turn_id, x, y, disc FROM squares WHERE turn_id = ?",
      [turn["id"]]
    );
    const squares = squareSelectResult[0];
    const board = Array.from(Array(8)).map(() => Array.from(Array(8)));
    squares.forEach((s) => {
      board[s.y][s.x] = s.disc;
    });

    // TODO: 盤面に置けるかチェック

    // 石を置く
    board[y][x] = disc;

    // TODO: ひっくり返す

    // ターンを保存する
    const nextDisc = disc === DARK ? LIGHT : DARK;
    const now = new Date();
    const turnInsertResult = await conn.execute<mysql.ResultSetHeader>(
      "INSERT INTO turns (game_id, turn_count, next_disc, end_at) VALUES (?, ?, ?, ?)",
      [game["id"], turnCount, nextDisc, now]
    );
    const turnId = turnInsertResult[0].insertId;

    const squareCount = board
      .map((line) => line.length)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const squaresInsertSql =
      "INSERT INTO squares (turn_id, x, y, disc) VALUES " +
      Array.from(Array(squareCount))
        .map(() => "(?, ?, ?, ?)")
        .join(",");
    const squaresInsertValues: any[] = [];
    board.forEach((line, y) => {
      line.forEach((disc, x) => {
        squaresInsertValues.push(turnId);
        squaresInsertValues.push(x);
        squaresInsertValues.push(y);
        squaresInsertValues.push(disc);
      });
    });
    await conn.execute(squaresInsertSql, squaresInsertValues);

    await conn.execute(
      "INSERT INTO moves (turn_id, disc, x, y) VALUES (?, ?, ?, ?)",
      [turnId, disc, x, y]
    );

    await conn.commit();
  } finally {
    await conn.end();
  }

  res.status(201).end();
});

app.use(errorHandler);

// ポートのリッスン設定
app.listen(PORT, () => {
  console.log(`Start! at http://localhost:${PORT}`);
});

// エラーハンドリング(express-async-errors)
function errorHandler(
  err: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  console.error("Unexpected error occurred", err);
  res.status(500).send({
    message: "Unexpected error occurred",
  });
}

async function connectMySql() {
  return await mysql.createConnection({
    host: "localhost",
    database: "reversi",
    user: "reversi",
    password: "password",
  });
}
