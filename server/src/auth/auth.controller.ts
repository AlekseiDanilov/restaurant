import {Body, Controller, Get, Post, Res, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {Credentials} from '../dto/credentials';
import {AuthGuard} from "@nestjs/passport";
import RolesGuard from "../roles.guard";
import {Roles} from "../role/roles";

@Controller('api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {
  }

  @Post('login')
  async login(@Body() credentials: Credentials, @Res() res) {
    const token = await this.authService.login(credentials);
    res.cookie("restaurant-jwt", token);
    res.json({token: `Bearer ${token}`});
  }

  @Get('logout')
  async logout(@Res() res) {
    res.cookie("restaurant-jwt", null);
    res.json({token: null});
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('verify')
  async verify() {
    return {
      ok: true
    }
  }
}
