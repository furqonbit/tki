import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill } from '../skills/schemas/skill.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import * as yup from 'yup';
import { UserProfileEnum } from './enums/userProfile.enum';
import yupValidation from '../utils/yupValidation';

const formCreateSchema = yup.object({
  name: yup.string().required('name is required'),
  email: yup.string().email().required('email is required'),
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
  profile: yup
    .string()
    .oneOf(Object.values(UserProfileEnum))
    .required('profile is required'),
});
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    const { isValidated, errors } = await yupValidation(
      createUserDto,
      formCreateSchema,
    );
    try {
      if (isValidated) {
        const hashedPass = await bcrypt.hash(createUserDto.password, 10);
        await new this.UserModel({
          ...createUserDto,
          password: hashedPass,
        }).save();

        return { message: 'create success' };
      } else {
        throw new BadRequestException(errors);
      }
    } catch (error) {
      throw new BadRequestException('Data cannot be processed');
    }
  }

  async findAll() {
    return await this.UserModel.find()
      .populate('skills', null, Skill.name)
      .exec();
  }

  async findUserWhereSkill(skills: string) {
    return await this.UserModel.find({ skills })
      .populate('skills', null, Skill.name)
      .exec();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
