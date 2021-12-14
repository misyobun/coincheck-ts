import { extend } from "underscore";
import { CoinCheck } from "../coinCheck";
import { OpenOrder } from "./openOrder";
import { OpenOrders } from "./openOrders";
import { Result, Success, Failure } from "../../misc/result"


export class Order {
    private urlRoot: string = '/api/exchange/orders';
    private _coinCheck: CoinCheck;
    constructor(coinCheck: CoinCheck) {
        this._coinCheck = coinCheck;
    }

    public async cancel(cancelId: string): Promise<Result<any, Error>>  {
        var requestParameter = {data: {id: cancelId}};
        try {
           const result = await this._coinCheck.request('delete', `${this.urlRoot}/${requestParameter.data.id}`, requestParameter);
           const value = JSON.parse(result);
           return new Success(value);
       } catch {
           return new Failure(Error());
       }
    }

    public async opens(): Promise<Result<OpenOrders, Error>> {
        try {
            const result = await this._coinCheck.request('get', `${this.urlRoot}/opens`, null);
            const openOrders = JSON.parse(result) as OpenOrders
            return new Success(openOrders)
        } catch {
            return new Failure(Error());
        }
    }

    public async transactions(): Promise<Result<any, Error>> {
        try {
            const result = await this._coinCheck.request('get', `${this.urlRoot}/transactions`, null);
            return new Success(JSON.parse(result));
        } catch {
            return new Failure(Error());
        }
    }
}