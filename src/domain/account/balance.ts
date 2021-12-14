export interface Balance {
    success: boolean;
    jpy: string;
    btc: number;
    jpy_reserved: number;
    btc_reserved: number;
    jpy_lend_in_use: number;
    btc_lend_in_use: number;
    jpy_lent: number;
    btc_lent: number;
    jpy_debt: number;
    btc_debt: number;
}