import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [ProductModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
