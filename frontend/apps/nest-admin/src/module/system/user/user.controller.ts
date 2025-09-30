import { Controller, Get, Post, Body, Put, Param, Query, Delete, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiConsumes, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, ListUserDto, ChangeStatusDto, ResetPwdDto } from './dto/index';

@ApiTags('用户管理')
@Controller('system/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: '用户-创建',
  })
  @ApiBody({
    type: CreateUserDto,
    required: true,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: '用户-列表',
  })
  @Get('/list')
  findAll(@Query() query: ListUserDto, @Request() req) {
    const user = req.user;
    return this.userService.findAll(query, user);
  }

  @ApiOperation({
    summary: '用户-部门树',
  })
  @Get('/deptTree')
  deptTree() {
    return this.userService.deptTree();
  }

  @ApiOperation({
    summary: '用户-角色+岗位',
  })
  @Get()
  findPostAndRoleAll() {
    return this.userService.findPostAndRoleAll();
  }

  @ApiOperation({
    summary: '用户-分配角色-详情',
  })
  @Get('/authRole/:id')
  authRole(@Param('id') id: string) {
    return this.userService.authRole(+id);
  }

  @ApiOperation({
    summary: '用户-角色信息-更新',
  })
  @Put('/authRole')
  updateAuthRole(@Query() query) {
    return this.userService.updateAuthRole(query);
  }

  @ApiOperation({
    summary: '用户-详情',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({
    summary: '用户-停用角色',
  })
  @ApiBody({
    type: ChangeStatusDto,
    required: true,
  })
  @Put('/changeStatus')
  changeStatus(@Body() changeStatusDto: ChangeStatusDto) {
    return this.userService.changeStatus(changeStatusDto);
  }

  @ApiOperation({
    summary: '用户-更新',
  })
  @ApiBody({
    type: UpdateUserDto,
    required: true,
  })
  @Put()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @ApiOperation({
    summary: '用户-重置密码',
  })
  @ApiBody({
    type: ResetPwdDto,
    required: true,
  })
  @Put('/resetPwd')
  resetPwd(@Body() body: ResetPwdDto) {
    return this.userService.resetPwd(body);
  }

  @ApiOperation({
    summary: '用户-删除',
  })
  @Delete(':id')
  remove(@Param('id') ids: string) {
    const menuIds = ids.split(',').map((id) => +id);
    return this.userService.remove(menuIds);
  }

  // shandcn 相关接口

  @ApiOperation({
    summary: '用户-getUserPage',
  })
  @Get('/page')
  getUserPage() {
    return {
      code: 0,
      data: {
        list: [
          {
            id: 141,
            username: 'admin1',
            nickname: '新用户',
            remark: null,
            deptId: null,
            deptName: null,
            postIds: null,
            email: '',
            mobile: '',
            sex: 0,
            avatar: '',
            status: 0,
            loginIp: '0:0:0:0:0:0:0:1',
            loginDate: 1744088947000,
            createTime: 1744088947000,
          },
          {
            id: 139,
            username: 'wwbwwb',
            nickname: '小秃头',
            remark: null,
            deptId: null,
            deptName: null,
            postIds: null,
            email: '',
            mobile: '',
            sex: 0,
            avatar: null,
            status: 0,
            loginIp: '0:0:0:0:0:0:0:1',
            loginDate: 1725973438000,
            createTime: 1725973438000,
          },
          {
            id: 131,
            username: 'hh',
            nickname: '呵呵',
            remark: null,
            deptId: 100,
            deptName: '芋道源码',
            postIds: [],
            email: '777@qq.com',
            mobile: '15601882312',
            sex: 1,
            avatar: null,
            status: 0,
            loginIp: '',
            loginDate: null,
            createTime: 1714178756000,
          },
          {
            id: 118,
            username: 'goudan',
            nickname: '狗蛋',
            remark: null,
            deptId: 103,
            deptName: '研发部门',
            postIds: [1],
            email: '',
            mobile: '15601691239',
            sex: 1,
            avatar: null,
            status: 0,
            loginIp: '0:0:0:0:0:0:0:1',
            loginDate: 1710637827000,
            createTime: 1657359883000,
          },
          {
            id: 117,
            username: 'admin123',
            nickname: '测试号02',
            remark: '1111',
            deptId: 100,
            deptName: '芋道源码',
            postIds: [2],
            email: '',
            mobile: '15601691234',
            sex: 1,
            avatar: null,
            status: 0,
            loginIp: '0:0:0:0:0:0:0:1',
            loginDate: 1727835380000,
            createTime: 1657359626000,
          },
          {
            id: 115,
            username: 'aotemane',
            nickname: '阿呆',
            remark: '11222',
            deptId: 102,
            deptName: '长沙分公司',
            postIds: [1, 2],
            email: '7648@qq.com',
            mobile: '15601691229',
            sex: 2,
            avatar: null,
            status: 0,
            loginIp: '',
            loginDate: null,
            createTime: 1651258543000,
          },
          {
            id: 114,
            username: 'hrmgr',
            nickname: 'hr 小姐姐',
            remark: null,
            deptId: null,
            deptName: null,
            postIds: [5],
            email: '',
            mobile: '15601691236',
            sex: 1,
            avatar: null,
            status: 0,
            loginIp: '0:0:0:0:0:0:0:1',
            loginDate: 1711290065000,
            createTime: 1647697858000,
          },
          {
            id: 112,
            username: 'newobject',
            nickname: '新对象',
            remark: null,
            deptId: 100,
            deptName: '芋道源码',
            postIds: [],
            email: '',
            mobile: '15601691235',
            sex: 1,
            avatar: null,
            status: 0,
            loginIp: '0:0:0:0:0:0:0:1',
            loginDate: 1710601898000,
            createTime: 1645614483000,
          },
          {
            id: 104,
            username: 'test',
            nickname: '测试号',
            remark: null,
            deptId: 107,
            deptName: '运维部门',
            postIds: [1, 2],
            email: '111@qq.com',
            mobile: '15601691200',
            sex: 1,
            avatar: null,
            status: 0,
            loginIp: '0:0:0:0:0:0:0:1',
            loginDate: 1743163276000,
            createTime: 1611166433000,
          },
          {
            id: 103,
            username: 'yuanma',
            nickname: '源码',
            remark: null,
            deptId: 106,
            deptName: '财务部门',
            postIds: null,
            email: 'yuanma@iocoder.cn',
            mobile: '15601701300',
            sex: 0,
            avatar: null,
            status: 0,
            loginIp: '0:0:0:0:0:0:0:1',
            loginDate: 1723369692000,
            createTime: 1610553035000,
          },
        ],
        total: 12,
      },
      msg: '',
    };
  }
}
