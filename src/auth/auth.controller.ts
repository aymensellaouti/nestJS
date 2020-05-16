import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { AuthService } from './auth.service';
import { PayloadInterface } from './Interfaces/payload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {
  }
  @Post('/signup')
  async signUp(@Body(ValidationPipe) credantialsDto: AuthCredentialsDto): Promise<{ username: string }> {
    return await this.authService.signUp(credantialsDto);
  }
  @Post('/signin')
  async signIn(@Body(ValidationPipe) credantialsDto: AuthCredentialsDto): Promise<PayloadInterface> {
    return await this.authService.signIn(credantialsDto);
  }

}
