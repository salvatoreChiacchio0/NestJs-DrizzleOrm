import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [ItemController],
  imports: [DrizzleModule],
  providers:[ItemService],
  exports:[ItemService]

})
export class ItemModule {}
