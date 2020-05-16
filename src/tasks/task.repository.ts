import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './Task.model';
import { CreateTaskDto } from './DTO/create-task.dto';
import { FilterTaskDto } from './DTO/get-filtred-task.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

  async findTask(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
    const {search, status} = filterTaskDto;
    const query = await this.createQueryBuilder('task');
    query.where('task.userId = :userId', {userId: user.id});
    if(search) {
      query.andWhere(
          'task.title LIKE :search OR task.description LIKE :search',
          {search: `%${search}%` }
        )
    }
    if(status) {
      query.andWhere('task.status = :status', {status})
    }
    console.log(user.id);
    return await query.getMany();
  }

  public async addTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const {title, description} = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }
}
