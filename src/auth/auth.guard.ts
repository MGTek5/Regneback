import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly TOKEN_DURATION_IN_S = 24 * 60 * 60;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) return false;
    ctx.user = await this.validateToken(ctx.headers.authorization);
    return true;
  }

  //eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async validateToken(auth: string) {
    let payload;
    const split = auth.split(' ');

    if (split.length !== 2 || split[0] !== 'Bearer')
      throw new UnauthorizedException('Invalid Token');
    const token = split[1];

    try {
      payload = jwt.verify(token, process.env.SECRET || 'sting-sell-pioneer');
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
    return payload;
  }
}
