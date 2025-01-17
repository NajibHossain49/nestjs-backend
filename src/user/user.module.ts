import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register User entity
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export UserService if needed elsewhere
})
export class UserModule {}
