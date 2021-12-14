import { Interface } from "readline";

export interface TickerData {
    last: number;
    bid: number;
    ask: number;
    high: number;
    low: number;
    volume: number;
    timestamp: string;
}