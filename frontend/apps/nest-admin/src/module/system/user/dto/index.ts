import { IsString, IsJSON, IsEnum, IsPhoneNumber, IsArray, Min, Length, IsOptional, IsBoolean, IsNumber, IsNumberString, IsEmail } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PagingDto } from 'src/common/dto/index';

/**
 * 用户状态
 */

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

/**
 * 创建用户
 * @param deptId 部门ID
 * @param nickName 昵称
 * @param userName 用户名
 * @param password 密码
 * @param phonenumber 手机号
 * @param postIds 岗位ID
 * @param roleIds 角色ID
 * @param status 状态
 * @param sex 性别
 * @param remark 备注
 * @param postSort 岗位排序
 */
export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  deptId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  // @IsEmail()
  @Length(0, 50)
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 30)
  nickName: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 30)
  userName: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(0, 200)
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  // @IsPhoneNumber('CN')
  phonenumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  postIds?: Array<string>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  roleIds?: Array<string>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  sex?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsNumber()
  postSort?: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    required: true,
  })
  @IsNumberString()
  userId: number;
}

export class ChangeStatusDto {
  @ApiProperty({
    required: true,
  })
  @IsNumberString()
  userId: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsEnum(StatusEnum)
  status: string;
}

export class ListUserDto extends PagingDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  deptId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  nickName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Length(0, 30)
  userName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phonenumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class ResetPwdDto {
  @ApiProperty({
    required: true,
  })
  @IsNumberString()
  userId: number;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @Length(5, 20)
  password: string;
}
