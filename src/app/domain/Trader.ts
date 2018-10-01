import {Trade} from './trade';

export class Trader
{
  private portfolio: Trade[];

  constructor(private name: string) {
    this.portfolio  = [];
  }
  addToPortfolio(trade: Trade){
    this.portfolio.push(trade);
  }

  getPortfolio(): Trade[]{
    return  this.portfolio;
  }

  getOpenTrades(): Trade[]{

    return this.portfolio.filter(
      (element)=>element.get_isOpen()
    );
  }

  getClosedTrades(): Trade[]{

    return this.portfolio.filter(
      (element)=>!element.get_isOpen()
    );
  }

   getName(): string  {
    return this.name;
  }

  getReleasedPnL(): number  {
    let releasedPortfolio: Trade[] = this.getClosedTrades();
    let sum: number = 0;

    releasedPortfolio.forEach((value)=>
      sum +=  value.getReleasedPnL()
    )
    return this.getRoundedPnL(sum);
  }

  getUnreleasedPnL(): number  {
    let unReleasedPortfolio: Trade[] = this.getOpenTrades();
    let sum: number = 0;

    unReleasedPortfolio.forEach((value)=>
      sum +=  value.getReleasedPnL()
    )

    return this.getRoundedPnL(sum);
  }


  getTotalPnL(): number  {
    return this.getRoundedPnL(this.getReleasedPnL() + this.getUnreleasedPnL());
  }

  private getRoundedPnL(pnl): number
  {
    return Math.round(pnl * 100 + Number.EPSILON) / 100;
  }

}
