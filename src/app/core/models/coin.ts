export class Coin {
  id: number = -1;
  asset: string = '';
  symbol: string = '';
  averagePrice: number = -1;
  marketPrice: number = -1;
  value = 0;
  fiatRatio = 1;
  amount: number = -1;
  overflow: number = -1;
  change24h: any;
}
