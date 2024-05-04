import express from "express";
import morgan from "morgan";
import "express-async-errors";

const PORT = 3000;

// Express Webフレームワークを使用
const app = express();
// ログ出力ライブラリを使用(devは開発用の設定)
app.use(morgan("dev"));
// Expressで静的ページを返す設定
app.use(express.static("Reversi/static", { extensions: ["html"] }));

// ルーティング
app.get("/api/hello", async (req, res) => {
  res.json({
    message: "hello!",
  });
});
// エラーテスト用エンドポイント
app.get("/api/error", async (req, res) => {
  throw new Error("Error!");
});

app.use(errorHandler);

// // ポートのリッスン設定
app.listen(PORT, () => {
  console.log(`Start! at http://localhost:${PORT}`);
});

// // エラーハンドリング(express-async-errors)
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
