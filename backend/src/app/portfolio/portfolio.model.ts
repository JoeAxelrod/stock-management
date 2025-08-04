import { Schema } from 'mongoose';

export const PortfolioSchema = new Schema({
  username: String,
  stocks: [String],
});
