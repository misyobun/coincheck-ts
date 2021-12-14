export interface TradePagination {
    limit: number;
    order: string;
    starting_after: number;
    ending_before: number;
}