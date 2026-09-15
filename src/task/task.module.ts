import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service.js';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TaskService],
})
export class TaskModule {}
