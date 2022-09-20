import { Module } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from './schemas/skill.schema';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SkillsController],
  providers: [SkillsService],
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
  ],
})
export class SkillsModule {}
