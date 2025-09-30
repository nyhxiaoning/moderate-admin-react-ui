import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { SysDeptEntity } from '../dept/entities/dept.entity';
import { SysPostEntity } from '../post/entities/post.entity';
import { SysRoleEntity } from '../role/entities/role.entity';
import { SysUserWithPostEntity } from './entities/user-width-post.entity';
import { SysUserWithRoleEntity } from './entities/user-width-role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './entities/sys-user.entity';
import { UserService } from './user.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, SysDeptEntity, SysRoleEntity, SysPostEntity, SysUserWithPostEntity, SysUserWithRoleEntity]),
    // TODO:移除当前的
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (config: ConfigService) => ({
    //     secret: config.get('jwt.secretkey'),
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
