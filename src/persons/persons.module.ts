import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service.js';
import { PersonsController } from './persons.controller.js';

@Module({
  controllers: [PersonsController],
  providers: [PersonsService],
  exports:[PersonsService]
})
export class PersonsModule {}
