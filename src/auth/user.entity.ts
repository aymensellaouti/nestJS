import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  username: string;

  @Column()
  salt: string;

  @Column()
  password: string;

  @OneToMany(
    type => Task,
    task => task.user,
    {eager: true})
  tasks: Task[];
  public async verifyPassword( password) {
    const hashedPassword = await Bcrypt.hash(password, this.salt);
    return hashedPassword === this.password;
  }
}
