import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegisterRequest, UserRegisterInviteRequest } from './dto/user.request';
import { UserResponse } from './dto/user.response';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: UserRegisterRequest): Promise<UserResponse> {
    const user = await this.userService.registerUser(registerDto);
    return UserResponse.mapFromDocument(user);
  }

  @Post('register/invite')
  @HttpCode(HttpStatus.CREATED)
  async registerViaInvite(@Body() registerDto: UserRegisterInviteRequest): Promise<UserResponse> {
    const user = await this.userService.registerViaInvite(registerDto);
    return UserResponse.mapFromDocument(user);
  }
} 