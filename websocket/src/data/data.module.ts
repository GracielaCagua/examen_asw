import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataGateway } from './data.gateway';

@Module({
  providers: [DataGateway, DataService],
})
export class DataModule {}
