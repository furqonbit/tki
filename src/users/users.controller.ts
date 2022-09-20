import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ProfilesGuard } from '../auth/profiles.guard';
import { Profiles } from '../auth/roles.decorator';
import { UserProfileEnum } from './enums/userProfile.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(ProfilesGuard)
  @Profiles(UserProfileEnum.BOARD)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(ProfilesGuard)
  @Profiles(UserProfileEnum.BOARD)
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
