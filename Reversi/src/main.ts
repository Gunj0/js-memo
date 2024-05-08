import express from "express";
import morgan from "morgan";
import "express-async-errors";
import mysql from "mysql2/promise";
import { GameGateway } from "./dataaccess/gameGateway";
import { TurnGateWay } from "./dataaccess/turnGateway";
import { MoveGateway } from "./dataaccess/moveGateway";
import { SquareGateway } from "./dataaccess/squareGateway";

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

// データアクセスクラス
const gameGateway = new GameGateway();
const turnGateway = new TurnGateWay();
const moveGateway = new MoveGateway();
const squareGateway = new SquareGateway();

// 対戦開始
app.post("/api/games", async (req, res) => {
  const now = new Date();
  const conn = await connectMySql();

  try {
    await conn.beginTransaction();

    const gameRecord = await gameGateway.insert(conn, now);

    const turnRecord = await turnGateway.insert(
      conn,
      gameRecord.id,
      0,
      DARK,
      now
    );

    await squareGateway.insertAll(conn, turnRecord.id, INITIAL_BOARD);

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
    const gameRecord = await gameGateway.findLatest(conn);
    if (!gameRecord) {
      throw new Error("Latest game not found");
    }

    const turnRecord = await turnGateway.findForGameIdAndTurnCount(
      conn,
      gameRecord.id,
      turnCount
    );
    if (!turnRecord) {
      throw new Error("Specified turn not found");
    }

    const squareRecords = await squareGateway.findForTurnId(
      conn,
      turnRecord.id
    );
    const board = Array.from(Array(8)).map(() => Array.from(Array(8)));
    squareRecords.forEach((s) => {
      board[s.y][s.x] = s.disc;
    });

    const responseBody = {
      turnCount,
      board,
      nextDisc: turnRecord.nextDisc,
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

  const conn = await connectMySql();
  try {
    // 1つ前のターンを取得する
    const gameRecord = await gameGateway.findLatest(conn);
    if (!gameRecord) {
      throw new Error("Latest game not found");
    }

    const previousTurnCount = turnCount - 1;
    const previousTurnRecord = await turnGateway.findForGameIdAndTurnCount(
      conn,
      gameRecord.id,
      previousTurnCount
    );
    if (!previousTurnRecord) {
      throw new Error("Specified turn not found");
    }

    const squareRecords = await squareGateway.findForTurnId(
      conn,
      previousTurnRecord.id
    );
    const board = Array.from(Array(8)).map(() => Array.from(Array(8)));
    squareRecords.forEach((s) => {
      board[s.y][s.x] = s.disc;
    });

    // TODO: 盤面に置けるかチェック

    // 石を置く
    board[y][x] = disc;

    // TODO: ひっくり返す

    // ターンを保存する
    const nextDisc = disc === DARK ? LIGHT : DARK;
    const now = new Date();
    const turnRecord = await turnGateway.insert(
      conn,
      gameRecord.id,
      turnCount,
      nextDisc,
      now
    );

    await squareGateway.insertAll(conn, turnRecord.id, board);

    await moveGateway.insert(conn, turnRecord.id, disc, x, y);

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
