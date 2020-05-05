import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './Task.model';
import { CreateTaskDto } from './DTO/create-task.dto';
import { FilterTaskDto } from './DTO/get-filtred-task.dto';
import { TaskStatisValidationPipe } from './pipes/task-statis-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {
  }

  @Get('')
  getAllTasks(
    @Query(ValidationPipe) taskFilter: FilterTaskDto
  ): Task[] {
    return this.tasksService.getTasks(taskFilter);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): any {
    return this.tasksService.deleteTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  creatTask(
    @Body() createTaskDto: CreateTaskDto ,
    ) {
    return this.tasksService.createTask(createTaskDto);
  }
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status', TaskStatisValidationPipe) status: TaskStatus) : Task
  {
    return this.tasksService.updateTask(id, status);
  }
}
