import { TradeHistoryData } from "./tradeHistoryData";
import { TradePagination } from "./tradePagination";

export interface TradeHistory {
    success: boolean;
    pagination: TradePagination;
    data: [TradeHistoryData];
}