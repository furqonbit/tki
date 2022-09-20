import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationParams } from '../utils/paginationParams';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity, ActivityDocument } from './schemas/activity.schema';
import * as yup from 'yup';
import yupValidation from '../utils/yupValidation';
import { UsersService } from '../users/users.service';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel(Activity.name) private ActivityModel: Model<ActivityDocument>,
    private userService: UsersService,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    const user = await this.userService.findUserWhereSkill(
      createActivityDto.skill,
    );
    const userArr = user.map((i: any) => i._id.toString());

    const formCreateSchema = yup.object({
      title: yup.string().required('title is required'),
      description: yup.string().required('description is required'),
      startdate: yup.date().required('startdate is required'),
      enddate: yup
        .date()
        .min(yup.ref('startdate'), "end date can't be before start date")
        .required('enddate is required'),
      skill: yup.string().required('password is required'),
      participants: yup
        .array()
        .of(yup.string().oneOf(userArr).required('participants is required')),
    });

    const { isValidated, errors } = await yupValidation(
      createActivityDto,
      formCreateSchema,
    );

    try {
      if (isValidated) {
        await new this.ActivityModel(createActivityDto).save();
        return { message: 'create success' };
      } else {
        throw new BadRequestException(errors);
      }
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
    const user = await this.userService.findUserWhereSkill(
      updateActivityDto.skill,
    );
    const userArr = user.map((i: any) => i._id.toString());

    const formEditSchema = yup.object({
      title: yup.string().required('title is required'),
      description: yup.string().required('description is required'),
      startdate: yup.date().required('startdate is required'),
      enddate: yup
        .date()
        .min(yup.ref('startdate'), "end date can't be before start date")
        .required('enddate is required'),
      skill: yup.string().required('password is required'),
      participants: yup
        .array()
        .of(yup.string().oneOf(userArr).required('participants is required')),
    });

    const { isValidated, errors } = await yupValidation(
      updateActivityDto,
      formEditSchema,
    );
    try {
      if (isValidated) {
        await this.ActivityModel.findByIdAndUpdate(id, updateActivityDto);
        return { message: 'update success' };
      } else {
        throw new BadRequestException(errors);
      }
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
