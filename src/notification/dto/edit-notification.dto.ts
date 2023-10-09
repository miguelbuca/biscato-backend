import {
  IsEnum,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditNotificationDto {
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

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsJSON()
  @IsOptional()
  extra?: object;
}
