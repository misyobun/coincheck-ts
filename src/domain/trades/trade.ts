import { CoinCheck } from "../coinCheck";
import { Result, Success, Failure } from "../../misc/result"
import { TradeHistory } from "./tradeHistory";

export class Trade {
    private urlRoot: string = '/api/trades';
    private _coinCheck: CoinCheck;
    constructor(coinCheck: CoinCheck) {
        this._coinCheck = coinCheck;
    }

    public async all(params: any): Promise<Result<TradeHistory, Error>> {
        try {
            const result = await this._coinCheck.request('get', this.urlRoot, params);
            const tradeHistory = JSON.parse(result) as TradeHistory;
            return new Success(tradeHistory)
        } catch(error) {
            return new Failure(Error());
        }
    }
    
}