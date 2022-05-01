export interface Trade {
  id: number;
  symbol: string;
  side: string;
  type: string;
  price: number;
  qty: number;
  commission: number;
  commissionAsset: string;
  orderId: number;
  tradeId: number;
  clientOrderId: string;
  createdAt: string;
}
