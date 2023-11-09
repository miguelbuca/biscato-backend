import {
  IsNumber,
  IsOptional,
  IsEnum,
  IsString,
} from 'class-validator';

export class EditPortfolioDto {
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
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  biography?: string;

  @IsOptional()
  @IsNumber()
  personId?: number;
}
