import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class AddStockDto {
  @IsString()
  @IsNotEmpty({ message: 'Stock symbol is required' })
  @Length(1, 10, { message: 'Stock symbol must be between 1 and 10 characters' })
  @Matches(/^[A-Za-z0-9.-]+$/, { 
    message: 'Stock symbol can only contain letters, numbers, dots, and hyphens' 
  })
  symbol: string;
}