import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {

  @IsNotEmpty()
  @MinLength(4)
  @IsString()
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    {
      message: "Le mot de passe doit avoir un caractère miniscule, majiscule et un caractère spéciale"
    }
  )
  password: string;
}
