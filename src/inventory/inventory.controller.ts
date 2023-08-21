import { Controller,Body, Catch, Delete, Get, Param, Patch, Post, Put, UseFilters, UseInterceptors, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory, NewInventory, } from 'src/drizzle/schema';
import { Roles } from 'src/helpers/roles/roles.decorator';
import { RolesGuard } from 'src/helpers/roles/roles.guard';
import { UserRoles } from 'src/helpers/roles/user-roles.enum';
import { Path } from 'src/helpers/path.enum';

@Controller(Path.INVENTORY)
export class InventoryController {
    constructor(
      private readonly inventoryService: InventoryService
    ) {}
  
    @Get()
    async findAll(): Promise<Inventory[]> {
      return this.inventoryService.findAll()
    }
  
    @Get('/:id')
    async findInventoryById(@Param('id') id): Promise<Inventory> {
      return this.inventoryService.findInventoryById(id)
    }
  
    @Delete('/:id')
    async deleteInventoryById(@Param('id') id,): Promise<Inventory[]> {
      return this.inventoryService.deleteInventory(id)
    }
  
    @Patch('/:id')
    async patchInventoryById(@Param('id') id, @Body() user: Inventory): Promise<Inventory[]> {
      return this.inventoryService.patchInventory(id, user)
    }
  
    @Put('/:id')
    async updateInventoryById(@Param('id') id, @Body() user: Inventory): Promise<Inventory[]> {
      return this.inventoryService.updateInventory(id, user)
    }
  
    
    @Post()
    @UseGuards(RolesGuard)
    @Roles(UserRoles.ADMIN)
    async createInventory(@Body() inventory: Inventory): Promise<Inventory[]> {        
      return this.inventoryService.createInventory(inventory)
    }

    @Get('/day/:day')
    async findItemsByDay(@Param('day') id): Promise<Inventory[]> {
      return this.inventoryService.findItemsByInventoryDay(id)
    }
  }
  
