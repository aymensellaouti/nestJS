import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../Task.model';

@Injectable()
export class TaskStatisValidationPipe implements PipeTransform {
  readonly allowedStatus: string[] = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS
  ];
  transform(status: string, metadata: ArgumentMetadata) {
    status = status.toUpperCase();
    if(this.allowedStatus.indexOf(status) === -1) {
      throw new BadRequestException(`${status} is not a valid status`);
    }
    return status;
  }
}
