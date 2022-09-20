import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlacklistTokenDocument = BlacklistToken & Document;

@Schema()
export class BlacklistToken {
  //   @Prop({ type: Types.ObjectId })
  //   _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  token: string;
}

export const BlacklistTokenSchema =
  SchemaFactory.createForClass(BlacklistToken);
