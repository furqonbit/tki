import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
// import { UpdateSkillDto } from './dto/update-skill.dto';
import { ProfilesGuard } from '../auth/profiles.guard';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  @UseGuards(ProfilesGuard)
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  @UseGuards(ProfilesGuard)
  findAll() {
    return this.skillsService.findAll();
  }

  // @Get(':id')
  // @UseGuards(JwtAuthGuard)
  // findOne(@Param('id') id: string) {
  //   return this.skillsService.findOne(+id);
  // }

  // @Patch(':id')
  // @UseGuards(JwtAuthGuard)
  // update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
  //   return this.skillsService.update(+id, updateSkillDto);
  // }

  // @Delete(':id')
  // @UseGuards(JwtAuthGuard)
  // remove(@Param('id') id: string) {
  //   return this.skillsService.remove(+id);
  // }
}
