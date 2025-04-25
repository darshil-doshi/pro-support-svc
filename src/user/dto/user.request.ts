import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserRegisterRequest {
  @IsEmail()
  email: string;

  @IsString()
  auth0Id: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  organizationName?: string; // Only required for direct registration
}

export class UserRegisterInviteRequest extends UserRegisterRequest {
  @IsString()
  inviteToken: string;
} 