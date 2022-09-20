import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSkillDto } from './dto/create-skill.dto';
// import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill, SkillDocument } from './schemas/skill.schema';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private SkillModel: Model<SkillDocument>,
  ) {}
  async create(createSkillDto: CreateSkillDto) {
    return await new this.SkillModel(createSkillDto).save();
  }

  async findAll() {
    return await this.SkillModel.find().exec();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} skill`;
  // }

  // update(id: number, updateSkillDto: UpdateSkillDto) {
  //   return `This action updates a #${id} skill`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} skill`;
  // }
}
