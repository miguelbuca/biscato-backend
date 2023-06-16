import {
  IsOptional,
  IsEnum,
  IsNumber,
} from 'class-validator';

export class EditApplicationDto {
  @IsEnum(["ACTIVE", "INACTIVE","AWAY" , "AVAILABLE" , "BUSY","OFFLINE" , "ONLINE", "ON_HOLD" , "IN_PROGRESS" , "COMPLETED" , "PENDING" , "PAUSED" , "UNDECIDED" , "IN_PROCESS" , "UNDER_REVIEW" , "CANCELED" , "BLOCKED", "RELEASED", "UNDER_MAINTENANCE"])
  @IsOptional()
  status?: "ACTIVE"| "INACTIVE"| "AWAY" | "AVAILABLE" | "BUSY"| "OFFLINE" | "ONLINE"| "ON_HOLD" | "IN_PROGRESS" | "COMPLETED" | "PENDING" | "PAUSED" | "UNDECIDED" | "IN_PROCESS" | "UNDER_REVIEW" | "CANCELED" | "BLOCKED"| "RELEASED"| "UNDER_MAINTENANCE";

  @IsNumber()
  @IsOptional()
  workId_: number;
}
