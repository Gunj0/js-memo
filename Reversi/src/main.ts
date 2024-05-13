import express from "express";
import "express-async-errors";
import morgan from "morgan";
import mysql from "mysql2/promise";
import { gameRouter } from "./presentation/gameRouter";
import { turnRouter } from "./presentation/turnRouter";
import { DomainError } from "./domain/error/domainError";

const PORT = 3000;

// Express Webフレームワークを使用
const app = express();
// ログ出力ライブラリを使用(devは開発用の設定)
app.use(morgan("dev"));
// Expressで静的ページを返す設定
app.use(express.static("Reversi/static", { extensions: ["html"] }));
// jsonデータを受け取るための設定
app.use(express.json());

app.use(gameRouter);
app.use(turnRouter);

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
  if (err instanceof DomainError) {
    res.status(400).json({
      type: err.type,
      message: err.message,
    });
    return;
  }

  console.error("Unexpected error occurred", err);
  res.status(500).send({
    message: "Unexpected error occurred",
  });
}
