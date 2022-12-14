import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BlacklistToken,
  BlacklistTokenDocument,
} from './schemas/blacklistToken.schema';
import * as yup from 'yup';
import yupValidation from '../utils/yupValidation';

const formLoginSchema = yup.object({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required'),
});
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(BlacklistToken.name)
    private BlacklistTokenModel: Model<BlacklistTokenDocument>,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  async validateUserPass(username: string, password: string): Promise<any> {
    const { isValidated } = await yupValidation(
      { username, password },
      formLoginSchema,
    );
    if (isValidated) {
      const user = await this.findUser(username);
      if (!user) throw new BadRequestException();

      if (!(await bcrypt.compare(password, user.password)))
        throw new UnauthorizedException('invalid login');

      return user;
    }
  }

  async generateToken(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
      }),
      profile: user.profile,
    };
  }

  async findUser(username: string) {
    return await this.UserModel.findOne({ username });
  }

  async checkBlacklist(token: string) {
    return await this.BlacklistTokenModel.findOne({ token });
  }

  async logout(token: string) {
    await new this.BlacklistTokenModel({ token }).save();
    return { message: 'logout success' };
  }
}
