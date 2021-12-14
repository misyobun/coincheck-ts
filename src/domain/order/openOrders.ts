import { OpenOrder } from "./openOrder";

export interface OpenOrders {
    success: boolean;
    orders: [OpenOrder];
}