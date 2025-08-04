import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { RemoveStockDto } from '../dto/remove-stock.dto';

@Injectable()
export class StockSymbolValidationPipe implements PipeTransform<string, Promise<string>> {
  async transform(value: string): Promise<string> {
    // Create a DTO instance for validation
    const dto = new RemoveStockDto();
    dto.symbol = value;
    
    // Validate using class-validator
    const errors = await validate(dto);
    
    if (errors.length > 0) {
      const errorMessages = errors.map(error => 
        Object.values(error.constraints || {}).join(', ')
      ).join('; ');
      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }
    
    return value;
  }
}