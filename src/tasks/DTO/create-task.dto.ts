import { IsNotEmpty, MinLength, ValidationArguments } from 'class-validator';
import ErrorMessages from './../errorMessages';
export class CreateTaskDto {
  @IsNotEmpty({
    message: ErrorMessages.isEmpty
  })
  @MinLength(20, {
    message: (validationData: ValidationArguments) => {
      return `La taille de votre ${validationData.property} ${validationData.value} est courte, la taille minimale de ${validationData.property} est ${validationData.constraints[0]}`
    }
  })
  title: string;
  @IsNotEmpty({
    message: ErrorMessages.isEmpty
  })
  description: string;
}


