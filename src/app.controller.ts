import { Controller, Request, Post, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';

/*
Create Login Route

With @UseGuards(AuthGuard('local')) we are using an AuthGuard that 
@nestjs/passportautomatically provisioned for us when we 
extended the passport-local strategy.

Our Passport local strategy has a default name of 'local'. 
We reference that name in the @UseGuards() decorator to associate it 
with code supplied by the passport-local package
*/
@Controller()
export class AppController {
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}