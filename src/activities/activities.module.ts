import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Activity, ActivitySchema } from './schemas/activity.schema';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: Activity.name, schema: ActivitySchema },
    ]),
  ],
})
export class ActivitiesModule {}
