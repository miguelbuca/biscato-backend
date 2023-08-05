import { WorkType } from "@prisma/client";

export class FilterWorkDto {
  skillType?: string;
  type?: WorkType | string;
  costPerHour?: {
    min?: number;
    max?: number;
  };
}