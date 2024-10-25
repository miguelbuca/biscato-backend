import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateApplicationDto {
  @IsEnum(["ACTIVE", "INACTIVE","AWAY" , "AVAILABLE" , "BUSY","OFFLINE" , "ONLINE", "ON_HOLD" , "IN_PROGRESS" , "COMPLETED" , "PENDING" , "PAUSED" , "UNDECIDED" , "IN_PROCESS" , "UNDER_REVIEW" , "CANCELED" , "BLOCKED", "RELEASED", "UNDER_MAINTENANCE"])
  @IsOptional()
  status?: "ACTIVE"| "INACTIVE"| "AWAY" | "AVAILABLE" | "BUSY"| "OFFLINE" | "ONLINE"| "ON_HOLD" | "IN_PROGRESS" | "COMPLETED" | "PENDING" | "PAUSED" | "UNDECIDED" | "IN_PROCESS" | "UNDER_REVIEW" | "CANCELED" | "BLOCKED"| "RELEASED"| "UNDER_MAINTENANCE";

  @IsNumber()
  @IsNotEmpty()
  workId: number;
}
