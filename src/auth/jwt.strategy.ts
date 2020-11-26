import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // supplies the method by which the JWT will be extracted from the Request
      ignoreExpiration: false, // if our route is supplied with an expired JWT, the request will be denied and a 401 Unauthorized response
      secretOrKey: jwtConstants.secret
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username }
  }
}