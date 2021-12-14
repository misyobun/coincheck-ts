export interface OpenOrder {
    id: number;
    order_type: string;
    rate: number | undefined;
    pair: string;
    pending_amount: number | undefined;
    pending_market_buy_amount: number | undefined;
    stop_loss_rate: number | undefined;
    created_at: string;
}