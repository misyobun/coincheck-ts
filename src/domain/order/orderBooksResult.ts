export interface OrderBooksResult {
    asks:[OrderBooksPair];
    bids:[OrderBooksPair];
}

export type OrderBooksPair = [number];