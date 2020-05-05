import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './Task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './DTO/create-task.dto';
import { FilterTaskDto } from './DTO/get-filtred-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id): Task {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException(`Le task d'id ${id} n'existe pas`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const {title, description} = createTaskDto;
    const task = new Task(uuidv4(), title, description, TaskStatus.OPEN);
    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string) {
    console.log('id',id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  getTasks(taskFilter: FilterTaskDto): Task[] {
    let tasks = [];

    if (Object.keys(taskFilter).length) {
      const {status, search} = taskFilter;
      if (status) {
        tasks = this.tasks.filter(task => task.status === status);
      }

      if (search) {
        tasks = this.tasks.filter( (task) => {
          return task.title.includes(search) ||
            task.description.includes(search);
        })
      }
    } else {
      tasks = this.getAllTasks();
    }
    return tasks;
  }
}
