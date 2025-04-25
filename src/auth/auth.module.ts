import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { Auth0Strategy } from './auth0.strategy';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [Auth0Strategy, AuthService, JwtGuard, RolesGuard],
  exports: [JwtGuard, AuthService],
  controllers: [AuthController],
})
export class AuthModule {} 