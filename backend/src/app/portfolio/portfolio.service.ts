import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';

interface PortfolioStock {
  symbol: string;
}

interface PortfolioDoc extends Document {
  username: string;
  stocks: string[];
}

@Injectable()
export class PortfolioService {

  private readonly DEFAULT_USERNAME = 'default';

  constructor(
    @InjectModel('Portfolio') private readonly portfolioModel: Model<PortfolioDoc>,
  ) {}

  /**
   * Return the entire portfolio as an array of objects expected by the frontend.
   */
  async findAll(): Promise<PortfolioStock[]> {
    const doc = await this.getOrCreate();
    return doc.stocks.map((symbol) => ({ symbol }));
  }

  /**
   * Add a symbol (case-insensitive) to the portfolio.
   */
  async add(symbol: string): Promise<void> {
    if (!symbol) return;
    const sym = symbol.toUpperCase();
    await this.portfolioModel.updateOne(
      { username: this.DEFAULT_USERNAME },
      { $addToSet: { stocks: sym } },
      { upsert: true },
    );
  }

  /**
   * Remove a symbol from the portfolio if it exists.
   */
  async remove(symbol: string): Promise<void> {
    if (!symbol) return;
    const sym = symbol.toUpperCase();
    await this.portfolioModel.updateOne(
      { username: this.DEFAULT_USERNAME },
      { $pull: { stocks: sym } },
    );
  }

  /**
   * Get existing portfolio doc for default user or create it.
   */
  private async getOrCreate(): Promise<PortfolioDoc> {
    let doc = await this.portfolioModel.findOne({ username: this.DEFAULT_USERNAME });
    if (!doc) {
      doc = await this.portfolioModel.create({ username: this.DEFAULT_USERNAME, stocks: [] });
    }
    return doc;
  }
}
