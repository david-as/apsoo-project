import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsulModule } from './consul/consul.module';

@Module({
  imports: [ConsulModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
