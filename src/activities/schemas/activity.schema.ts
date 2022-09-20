import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Skill } from '../../skills/schemas/skill.schema';
import { User } from '../../users/schemas/user.schema';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  // @Prop({ type: Types.ObjectId })
  // _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startdate: Date;

  @Prop({ required: true })
  enddate: Date;

  @Prop({ type: Types.ObjectId, ref: Skill.name })
  skill: Skill;

  @Prop({ type: [Types.ObjectId], ref: User.name })
  participants: User[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
