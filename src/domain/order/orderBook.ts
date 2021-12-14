import { CoinCheck } from "../coinCheck";
import { OrderBooksResult } from "./orderBooksResult";
import { Result, Success, Failure } from "../../misc/result"

export class OrderBook {
    private _coinCheck: CoinCheck;
    constructor(coinCheck: CoinCheck) {
        this._coinCheck = coinCheck;
    }

    public async all(): Promise<Result<OrderBooksResult, Error>> {
       const result = await this._coinCheck.request('get', '/api/order_books', null);
       try {
           var orderBooksResult = JSON.parse(result) as OrderBooksResult;
           return new Success(orderBooksResult);
       } catch  {
           return new Failure(Error());
       }
    }
}