import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  async exchangeCodeForTokens(code: string) {
    try {
      const auth0Domain = this.configService.get<string>('AUTH0_DOMAIN');
      const clientId = this.configService.get<string>('AUTH0_CLIENT_ID');
      const clientSecret = this.configService.get<string>('AUTH0_CLIENT_SECRET');
      const redirectUri = this.configService.get<string>('AUTH0_CALLBACK_URL');

      const response = await axios.post(`https://${auth0Domain}/oauth/token`, {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri
      });

      return {
        access_token: response.data.access_token,
        id_token: response.data.id_token,
        expires_in: response.data.expires_in
      };
    } catch (error) {
      throw new HttpException(
        'Failed to exchange authorization code for tokens',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  validateUser(payload: any) {
    // This method can be expanded to include additional validation logic
    return payload;
  }

  getUserFromToken(token: string) {
    // This method can be expanded to decode and validate JWT tokens
    return null;
  }
} 