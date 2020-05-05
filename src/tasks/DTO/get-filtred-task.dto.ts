import { TaskStatus } from '../Task.model';
import ErrorMessages from './../errorMessages';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
export class FilterTaskDto {
  @IsOptional()
  @IsIn([TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.OPEN], {
    message: ErrorMessages.invalidTaskStatus
  })
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty({message : ErrorMessages.isEmpty})
  search: string;
}
