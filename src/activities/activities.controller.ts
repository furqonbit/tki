import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth-jwt.guard';
import { ProfilesGuard } from '../auth/profiles.guard';
import { Profiles } from '../auth/roles.decorator';
import { UserProfileEnum } from '../users/enums/userProfile.enum';
import { PaginationParams } from '../utils/paginationParams';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @UseGuards(ProfilesGuard)
  @Profiles(UserProfileEnum.EXPERT)
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @Get()
  @UseGuards(ProfilesGuard)
  findAll(@Query() paginationParams: PaginationParams) {
    return this.activitiesService.findAll(paginationParams);
  }

  @Patch(':id')
  @UseGuards(ProfilesGuard)
  @Profiles(UserProfileEnum.EXPERT)
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @UseGuards(ProfilesGuard)
  @Profiles(UserProfileEnum.EXPERT)
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(id);
  }

  @Get(':id')
  @UseGuards(ProfilesGuard)
  findOneSkill(
    @Query() paginationParams: PaginationParams,
    @Param('id') id: string,
  ) {
    return this.activitiesService.findOneSkill(paginationParams, id);
  }
}
