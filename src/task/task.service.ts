import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  @Cron(CronExpression.EVERY_10_MINUTES)
  handleCron() {
    this.logger.log('cron jon');
  }

  @Interval(1000)
  handleInterval() {
    this.logger.log('Interval');
  }

  @Timeout(5000)
  handleTimeout() {
    this.logger.log('Timeout');
  }
}
