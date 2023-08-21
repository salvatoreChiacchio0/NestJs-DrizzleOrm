import { Controller,Body, Catch, Delete, Get, Param, Patch, Post, Put, UseFilters, UseInterceptors, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from 'src/drizzle/schema';
import { ErrorInterceptor } from 'src/helpers/error.interceptor';
import { Roles } from 'src/helpers/roles/roles.decorator';
import { RolesGuard } from 'src/helpers/roles/roles.guard';
import { UserRoles } from 'src/helpers/roles/user-roles.enum';
import { Path } from 'src/helpers/path.enum';

@Controller(Path.ITEM)
@UseInterceptors(ErrorInterceptor)

export class ItemController {
    
  constructor(
    private readonly itemService: ItemService
  ) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.itemService.findAll()
  }

  @Get('/:id')
  async findItemById(@Param('id') id): Promise<Item> {
    return this.itemService.findItemById(id)
  }

  @Delete('/:id')
  async deleteItemById(@Param('id') id,): Promise<Item[]> {
    return this.itemService.deleteItem(id)
  }

  @Patch('/:id')
  async patchItemById(@Param('id') id, @Body() user: Item): Promise<Item[]> {
    return this.itemService.patchItem(id, user)
  }

  @Put('/:id')
  async updateItemById(@Param('id') id, @Body() user: Item): Promise<Item[]> {
    return this.itemService.updateItem(id, user)
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoles.ADMIN)
  async createItem(@Body() user: Item): Promise<Item[]> {
    return this.itemService.createItem(user)
  }
  @Get('quantity/:id')
  async  getquantityByItem(): Promise<any[]> {
    return this.itemService.getAllQuantityByItemName()
  }
}
