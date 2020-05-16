import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query, UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './Task.model';
import { CreateTaskDto } from './DTO/create-task.dto';
import { FilterTaskDto } from './DTO/get-filtred-task.dto';
import { TaskStatisValidationPipe } from './pipes/task-statis-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get('')
  async getAllTasks(
    @Query(ValidationPipe) taskFilter: FilterTaskDto,
    @GetUser() user: User
  ): Promise<Task[]> {
    return await this.tasksService.getTasks(taskFilter, user);
  }

  @Get('/:id')
  getTaskById(
    @Param(
      'id',
      ParseIntPipe) id: number,
      user: User
    ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete('/:id')
  async deleteTaskById(
    @Param('id', ParseIntPipe) id: string,
    @GetUser() user: User
  ): Promise<any> {
    const response =  await this.tasksService.deleteTaskById(id, user);
    if(response) {
      return {count:1}
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  creatTask(
    @Body() createTaskDto: CreateTaskDto ,
    @GetUser() user: User
    ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }
  @Patch('/:id/status')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatisValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ) : Promise<Task>
  {
    return this.tasksService.updateTask(id, status, user);
  }
}
