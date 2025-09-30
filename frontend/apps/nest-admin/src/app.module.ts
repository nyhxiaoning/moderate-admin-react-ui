/*
 * @Author: ningyongheng ningyongheng@jeejio.com
 * @Date: 2024-05-06 13:56:05
 * @LastEditors: ningyongheng ningyongheng@jeejio.com
 * @LastEditTime: 2024-06-11 15:47:57
 * @FilePath: /server/src/app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { APP_GUARD } from '@nestjs/core';
// import { AuthModule } from './module/system/auth/auth.module';
import { AxiosModule } from './module/axios/axios.module';
import { CacheModule } from './module/monitor/cache/cache.module';
import { DeptModule } from './module/system/dept/dept.module';
import { DictModule } from './module/system/dict/dict.module';
import { HttpModule } from '@nestjs/axios';
import { JwtAuthGuard } from 'src/common/guards/auth.guard';
import { LoginlogModule } from './module/monitor/loginlog/loginlog.module';
import { MainModule } from './module/main/main.module';
import { MenuModule } from './module/system/menu/menu.module';
import { NoticeModule } from './module/system/notice/notice.module';
import { OnlineModule } from './module/monitor/online/online.module';
import { OperlogModule } from './module/monitor/operlog/operlog.module';
import { PostModule } from './module/system/post/post.module';
import { RedisModule } from './module/redis/redis.module';
import { RoleModule } from './module/system/role/role.module';
import { RolesGuard } from './common/guards/roles.guard';
import { ServerModule } from './module/monitor/server/server.module';
import { SysConfigModule } from './module/system/config/config.module';
import { ToolModule } from './module/system/tool/tool.module';
import { UploadModule } from './module/upload/upload.module';
import { UserModule } from './module/system/user/user.module';
import configuration from './config/index';

@Global()
@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      load: [configuration],
      isGlobal: true,
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          autoLoadEntities: true,
          keepConnectionAlive: true,
          timezone: 'Asia/Beijing',
          // TODO:直接导入配置文件，会报错，暂时用这种写法
          ...config.get('db.mysql'),
          // cache: {
          //   type: 'ioredis',
          //   ...config.get('redis'),
          //   alwaysEnabled: true,
          //   duration: 3 * 1000, // 缓存3s
          // },
        } as TypeOrmModuleOptions;
      },
    }),
    HttpModule,
    // AuthModule,
    UserModule,
    ToolModule,
    DeptModule,
    DictModule,
    MenuModule,
    RoleModule,
    PostModule,
    SysConfigModule,
    NoticeModule,
    MainModule,
    RedisModule,
    CacheModule,
    LoginlogModule,
    OperlogModule,
    AxiosModule,
    OnlineModule,
    ServerModule,
    UploadModule,
  ],
  // TODO:关闭jwt的校验
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: JwtAuthGuard,
  //   },
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
})
export class AppModule {}
