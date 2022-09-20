import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationParams } from '../utils/paginationParams';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity, ActivityDocument } from './schemas/activity.schema';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name) private ActivityModel: Model<ActivityDocument>,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      await new this.ActivityModel(createActivityDto).save();
      return { message: 'create success' };
    } catch (error) {
      throw new BadRequestException('Data cannot be processed');
    }
  }

  async findAll(paginationParams: PaginationParams) {
    return await this.ActivityModel.find()
      .populate('participants')
      .populate('skill')
      .skip(paginationParams.skip)
      .limit(paginationParams.limit)
      .sort({ startdate: paginationParams.order })
      .exec();
  }

  async findOneSkill(paginationParams: PaginationParams, id: string) {
    return await this.ActivityModel.find({ skill: id })
      .populate('participants')
      .populate('skill')
      .skip(paginationParams.skip)
      .limit(paginationParams.limit)
      .sort({ startdate: paginationParams.order })
      .exec();
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    try {
      await this.ActivityModel.findByIdAndUpdate(id, updateActivityDto);
      return { message: 'update success' };
    } catch (error) {
      throw new BadRequestException('Data cannot be processed');
    }
  }

  async remove(id: string) {
    try {
      await this.ActivityModel.findByIdAndRemove(id);
      return { message: 'delete success' };
    } catch (error) {
      throw new BadRequestException('Data cannot be processed');
    }
  }
}
