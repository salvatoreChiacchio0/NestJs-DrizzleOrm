import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [InventoryController],
  imports: [DrizzleModule],
  providers:[InventoryService],
  exports:[InventoryService]

})
export class InventoryModule {}
