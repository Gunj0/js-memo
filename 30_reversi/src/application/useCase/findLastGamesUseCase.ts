import { connectMySql } from "../../infrastructure/connection";
import {
  FindLastGamesQueryModel,
  FindLastGamesQueryService,
} from "../query/findLastGamesQueryService";

const FIND_COUNT = 10;

export class FindLastGamesUseCase {
  constructor(private _queryService: FindLastGamesQueryService) {}

  async run(): Promise<FindLastGamesQueryModel[]> {
    const conn = await connectMySql();
    try {
      return await this._queryService.query(conn, FIND_COUNT);
    } finally {
      conn.end();
    }
  }
}
