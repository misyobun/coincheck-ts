
import { CoinCheck } from "../coinCheck";
import { Balance } from "./balance";
import { Result, Success, Failure } from "../../misc/result"

export class Account {
    private urlRoot: string = '/api/accounts/balance';
    private _coinCheck: CoinCheck;
    constructor(coinCheck: CoinCheck) {
        this._coinCheck = coinCheck;
    }

    public async balance(): Promise<Result<Balance, Error>> {
       try {
           const result = await this._coinCheck.request('get', this.urlRoot, null);
           var balance = JSON.parse(result) as Balance;
           return new Success(balance);
       } catch (error) {
           return new Failure(Error());
       }
    }
}