import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { SortOrder } from 'mongoose';

export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  order?: SortOrder;
}
