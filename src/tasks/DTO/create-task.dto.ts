import { IsNotEmpty } from 'class-validator';
import ErrorMessages from './../errorMessages';
export class CreateTaskDto {
  @IsNotEmpty({
    message: ErrorMessages.isEmpty
  })
  title: string;

  @IsNotEmpty({
    message: ErrorMessages.isEmpty
  })
  description: string;
}


