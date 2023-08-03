import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class WsAuthGuard
  extends AuthGuard('jwt')
  implements CanActivate
{
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const client = context
      .switchToWs()
      .getClient();
    const request = context
      .switchToHttp()
      .getRequest();

    // Now, you can add any custom authentication logic here if needed or just call the parent canActivate method
    return super.canActivate(
      context,
    ) as Promise<boolean>;
  }
}
