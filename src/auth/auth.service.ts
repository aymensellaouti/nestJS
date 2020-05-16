import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from './Interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  async signUp(credentials: AuthCredentialsDto): Promise<{ username: string }> {
    return await this.userRepository.signUp(credentials);
  }
  async signIn(credentials: AuthCredentialsDto): Promise<PayloadInterface> {
    const user = await this.userRepository.signIn(credentials);
    if (user) {
      const payload = {username: user.username};
      const accessToken = await this.jwtService.sign(payload);
      return {accessToken};
    } else {
      throw new UnauthorizedException('Veuillez vérifier vos données');
    }
  }
}
