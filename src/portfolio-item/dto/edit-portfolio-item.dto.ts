import {
  IsNumber,
  IsOptional,
  IsEnum,
  IsString,
} from 'class-validator';

export class EditPortfolioItemDto {
  @IsEnum([
    'ACTIVE',
    'INACTIVE',
    'AWAY',
    'AVAILABLE',
    'BUSY',
    'OFFLINE',
    'ONLINE',
    'ON_HOLD',
    'IN_PROGRESS',
    'COMPLETED',
    'PENDING',
    'PAUSED',
    'UNDECIDED',
    'IN_PROCESS',
    'UNDER_REVIEW',
    'CANCELED',
    'BLOCKED',
    'RELEASED',
    'UNDER_MAINTENANCE',
  ])
  @IsOptional()
  status?:
    | 'ACTIVE'
    | 'INACTIVE'
    | 'AWAY'
    | 'AVAILABLE'
    | 'BUSY'
    | 'OFFLINE'
    | 'ONLINE'
    | 'ON_HOLD'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'PENDING'
    | 'PAUSED'
    | 'UNDECIDED'
    | 'IN_PROCESS'
    | 'UNDER_REVIEW'
    | 'CANCELED'
    | 'BLOCKED'
    | 'RELEASED'
    | 'UNDER_MAINTENANCE';

  @IsOptional()
  @IsNumber()
  personId?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  portfolioId?: number;
}
