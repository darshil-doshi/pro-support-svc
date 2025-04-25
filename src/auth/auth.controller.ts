import { Controller, Get, UseGuards, Request, Res } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get('login')
  login(@Res() res: Response) {
    const auth0Domain = this.configService.get<string>('AUTH0_DOMAIN');
    const clientId = this.configService.get<string>('AUTH0_CLIENT_ID');
    const redirectUri = this.configService.get<string>('AUTH0_CALLBACK_URL');
    const audience = this.configService.get<string>('AUTH0_AUDIENCE');

    const authorizationUrl = `https://${auth0Domain}/authorize?` +
      `response_type=code&` +
      `client_id=${clientId}&` +
      `redirect_uri=${redirectUri}&` +
      `audience=${audience}&` +
      `scope=openid profile email`;

    res.redirect(authorizationUrl);
  }

  @Get('callback')
  async callback(@Request() req, @Res() res: Response) {
    const code = req.query.code;
    try {
      const tokens = await this.authService.exchangeCodeForTokens(code);
      res.json(tokens);
    } catch (error) {
      res.status(400).json({ error: 'Failed to exchange code for tokens' });
    }
  }

  @Get('public')
  public() {
    return { message: 'This is a public endpoint' };
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  getProfile(@Request() req) {
    return {
      message: 'You are authenticated!',
      user: req.user
    };
  }

  @Get('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  adminOnly(@Request() req) {
    return {
      message: 'You have admin access!',
      user: req.user
    };
  }

  @Get('support')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('support', 'admin')
  supportAccess(@Request() req) {
    return {
      message: 'You have support access!',
      user: req.user
    };
  }
} 