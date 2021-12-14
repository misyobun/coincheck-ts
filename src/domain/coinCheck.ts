import querySting from 'querystring';
import crypto from 'crypto';
import { isEmpty,extend } from 'underscore';
import axios from 'axios';
import {Account} from './account/account';
import { OrderBook } from './order/orderBook';
import { Trade } from './trades/trade';
import { Order } from './order/order';
import { Ticker } from './ticker/ticker';

export class CoinCheck {
    private readonly accessKey: string;
    private readonly secretKey: string;  
    private headers: {[index:string]: string;} = {};
    public account: Account;    
    public order: Order;
    public orderBook: OrderBook;
    public trade: Trade;
    public ticker: Ticker;
    

    constructor(accessKey: string, secretKey: string) {
        this.accessKey = accessKey
        this.secretKey = secretKey
        this.account = new Account(this);
        this.order = new Order(this);
        this.orderBook = new OrderBook(this);
        this.trade = new Trade(this);
        this.ticker = new Ticker(this);
    }

    public async request(method:string, path:string, params:any): Promise<any> {
        var paramData, options, error;

        params = params || [];
        paramData = params.data ? params.data : {};
        options = params.options ? params.options : {};
        
        if (method == 'get' && !isEmpty(paramData)) {
            path = path + '?' + querySting.stringify(paramData);
        }

        var headers = extend(this.headers, {
            'Content-Type' : 'application/json',
            'User-Agent' : 'NodeCoinCheckClient'
        });

        this.setSignature(path, paramData);

        if(method == 'post' || method == 'delete') {
            headers = extend(headers, {
                'Content-Length': Buffer.byteLength(JSON.stringify(paramData))
            });
        }    
        const url = `https://coincheck.com${path}`;
        try {
            console.log(`url ${url}`);
            var data: any = await this.executeWithMethod(method, url, paramData, headers);  
            return JSON.stringify(data);
        } catch (error) {
            return error;
        }
    }

    private async executeWithMethod( method: string, url: string, data: any, headers: any) {
        switch (method) {
            case 'post':
                return (await axios.post(url, {data: data, headers: headers})).data
            case 'delete':
                return (await axios.delete(url, {data: data, headers: headers})).data   
            default:
                return (await axios.get(url, {headers: headers})).data;
        }
    }

    private setSignature(path: string, param:any) {
        var nonce, url, message, signature;
        nonce = new Date().getTime();
        url = `https://coincheck.com${path}`;
        message = nonce + url + ((Object.keys(param).length > 0) ? JSON.stringify(param) : '');
        signature = crypto.createHmac('sha256', this.secretKey).update(message).digest('hex');
        this.headers = extend(this.headers, {
            'ACCESS-KEY': this.accessKey,
            'ACCESS-NONCE': nonce,
            'ACCESS-SIGNATURE': signature
        });
    }
}