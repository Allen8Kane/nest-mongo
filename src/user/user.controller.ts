import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/User.dto';
import { User } from './schemas/user.schema';
import { ParseObjectIdPipe } from 'src/utils/parseId.pipe';
import { ObjectId } from 'bson';


@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() user: UserDto) {
    return await this.userService.create(user);
  }

  @Get()
  async findAll() {
    const res = await this.userService.findAll();
    return res;
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const res = await this.userService.findOne(id);
    if (!res) throw new NotFoundException();
    return res;
  }

  @Put(':id')
  async update(@Param('id', ParseObjectIdPipe) id: ObjectId, @Body() userDto: UserDto) {
    const res = await this.userService.update(id, userDto);
    if (!res) throw new NotFoundException();
    return res;
  }

  @Delete(':id')
  async remove(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    const res = await this.userService.remove(id);
    if (!res) throw new NotFoundException()
    return res;
  }
}
