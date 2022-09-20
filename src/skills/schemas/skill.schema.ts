import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema()
export class Skill {
  //   @Prop({ type: Types.ObjectId })
  //   _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);
