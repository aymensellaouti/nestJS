import { Injectable, NotFoundException } from '@nestjs/common';
//import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './DTO/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './Task.model';
import { FilterTaskDto } from './DTO/get-filtred-task.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {
  }
  // private tasks: Task[] = [];
  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTaskById(id, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({where: {id, userId: user.id}});
    if (!task) {
      throw new NotFoundException(`Le task d'id ${id} n'existe pas`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto, user: User) {
    return this.taskRepository.addTask(createTaskDto, user);
  }

  async deleteTaskById(id: string, user: User) {
    const task = await this.getTaskById(id, user);
    return this.taskRepository.remove(task);
  }

  async deleteTaskById2(id: string): Promise<any> {
    const task = this.taskRepository.delete(id);
    return task;
  }

  async updateTask(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    task.save();
    delete task.user;
    return task;
  }

  async getTasks(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    return await this.taskRepository.findTask(filterTaskDto, user);
  }

  //
  // getTasks(taskFilter: FilterTaskDto): Task[] {
  //   let tasks = [];
  //
  //   if (Object.keys(taskFilter).length) {
  //     const {status, search} = taskFilter;
  //     if (status) {
  //       tasks = this.tasks.filter(task => task.status === status);
  //     }
  //
  //     if (search) {
  //       tasks = this.tasks.filter( (task) => {
  //         return task.title.includes(search) ||
  //           task.description.includes(search);
  //       })
  //     }
  //   } else {
  //     tasks = this.getAllTasks();
  //   }
  //   return tasks;
  // }
}
