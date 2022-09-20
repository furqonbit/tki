import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UsersService],
})
export class UsersModule {}
