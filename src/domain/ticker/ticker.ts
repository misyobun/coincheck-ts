import { CoinCheck } from "../coinCheck";
import { TickerData } from "./tickerData";
import { Result, Success, Failure } from "../../misc/result"

export class Ticker {
    private urlRoot: string = '/api/ticker';
    private _coinCheck: CoinCheck;
    constructor(coinCheck: CoinCheck) {
        this._coinCheck = coinCheck;
    }

    public async all(): Promise<Result<TickerData, Error>>  {
        try {
            const result = await this._coinCheck.request('get', this.urlRoot, null);
            const tickerData = JSON.parse(result) as TickerData
            return new Success(tickerData)
        } catch {
            return new Failure(Error());
        }
    }
}