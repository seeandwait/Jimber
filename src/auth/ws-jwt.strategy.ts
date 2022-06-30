import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../users/users.service';

import { WsException } from '@nestjs/websockets';
import { jwtConstants } from './constants';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor(
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('bearerToken'),
      secretOrKey: 'supersecret',
    });
  }

  async validate(payload: any) {
    try {
      return this.usersService.findOne(payload.username);
    } catch (error) {
      throw new WsException('Unauthorized access');
    }
  }
}