import { UserProfileEnum } from '../enums/userProfile.enum';

export class CreateUserDto {
  name: string;
  email: string;
  username: string;
  password: string;
  profile: UserProfileEnum;
  skills: string[];
}
