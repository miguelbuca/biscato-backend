import {
  Controller,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('contract')
export class ContractController {}
