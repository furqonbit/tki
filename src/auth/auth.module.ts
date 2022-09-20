import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import {
  BlacklistToken,
  BlacklistTokenSchema,
} from './schemas/blacklistToken.schema';
import { User, UserSchema } from '../users/schemas/user.schema';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    MongooseModule.forFeature([
      { name: BlacklistToken.name, schema: BlacklistTokenSchema },
      { name: User.name, schema: UserSchema },
    ]),
    JwtModule.register({
      secret: '123456',
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
