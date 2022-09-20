import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Skill } from '../../skills/schemas/skill.schema';
import { UserProfileEnum } from '../enums/userProfile.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  // @Prop({ type: Types.ObjectId })
  // _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  profile: UserProfileEnum;

  @Prop({ type: [Types.ObjectId], ref: Skill.name })
  skills: Skill[];
}

export const UserSchema = SchemaFactory.createForClass(User);
