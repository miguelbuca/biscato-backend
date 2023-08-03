import { WorkType } from "@prisma/client";

export class FilterWorkDto {
  skillType?: string;
  type?: WorkType;
  costPerHour?: {
    min?: number;
    max?: number;
  };
}