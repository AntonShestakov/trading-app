export class Trader
{
  constructor(private name: string) { }

  getName(): string
  {
    return this.name;
  }
  getReleasedPnL(): number
  {
    return this.getRoundedPnL(0);
  }
  getUnreleasedPnL(): number
  {
    return this.getRoundedPnL(0);
  }
  getTotalPnL(): number
  {
    return this.getRoundedPnL(this.getReleasedPnL() + this.getUnreleasedPnL());
  }
  private getRoundedPnL(pnl): number
  {
    return Math.round(pnl * 100 + Number.EPSILON) / 100;
  }

}
