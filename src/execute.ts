
import { CoinCheck } from "./domain/coinCheck";
import { config } from "dotenv"

config();

async function trade() {
    let accessToken = process.env.COIN_CHECK_ACCESS_TOKEN ?? '';
    let secretToken = process.env.COIN_CHECK_SECRET_TOKEN ?? '';
    let coinCheck = new CoinCheck(accessToken, secretToken);
    
    
    const balance = await coinCheck.account.balance();
    if (balance.isSuccess()) {
        console.log(`${balance.value.btc_reserved}`);
    } else {
        console.log('error');
    }

    const params = {
        data: {
            pair: 'btc_jpy'
        }
    }

    const trades = await coinCheck.trade.all(params);
    if (trades.isSuccess()) {
        console.log(`trades ${trades.value.data[0].amount}`);
    } else {
        console.log('trade error');
    }


    const orderBooks = await coinCheck.orderBook.all();

    if (orderBooks.isSuccess()) {
        console.log(`orderbook asks : ${orderBooks.value.asks[0]} bids * ${orderBooks.value.bids[0]}`);
    }

    const ticker = await coinCheck.ticker.all();
    if(ticker.isSuccess()) {
        console.log(`ticker ask ${ticker.value.ask} bid ${ticker.value.bid}`);
    }
    

    const order = await coinCheck.order.opens();
    if (order.isSuccess()) {
        if (order.value.orders.length > 0) {
            console.log(`opens ${order.value.orders[0].rate}`);
        } 
    }
}

trade();