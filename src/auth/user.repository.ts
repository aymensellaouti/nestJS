import { EntityRepository, Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';

import { User } from './user.entity';
import { AuthCredentialsDto } from './DTO/auth-credentials.dto';
import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(signUpDTO: AuthCredentialsDto): Promise<{ username: string }> {
    const {username, password} = signUpDTO;
    const user = new User();
    user.username = username;
    user.salt = await Bcrypt.genSalt();
    user.password = await Bcrypt.hash(password, user.salt);
    try {
      await user.save();
      return {username};
    } catch(error) {
      if(error.code == 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException("Problème au niveau du serveur veuillez consulter l'administrateur");
      }
    }
  }

  async signIn(signInDTO: AuthCredentialsDto): Promise<any> {
    const {username, password} = signInDTO;

    const user = await User.findOne({username});

    if (user && await user.verifyPassword(password)) {
      return user;
    } else {
      return null
    }

  }
}
