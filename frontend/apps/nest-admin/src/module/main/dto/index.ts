import { IsString, IsJSON, IsEnum, IsPhoneNumber, Min, Length, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

/**
 * 登录
 * @param code 验证码
 * @param username 用户名
 * @param password 密码
 *
 */
export class LoginDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  code?: string;

  @IsString()
  @Length(2, 10)
  username: string;

  @IsString()
  @Length(5, 20)
  password: string;
}

/**
 * 注册
 */
export class RegisterDto extends LoginDto {}

/**
 * 客户端信息
 * @param ipaddr IP地址
 * @param userAgent 用户代理
 * @param browser 浏览器
 * @param os 操作系统
 * @param loginLocation 登录地点
 */
export class ClientInfoDto {
  ipaddr: string;
  userAgent: string;
  browser: string;
  os: string;
  loginLocation: string;
}
