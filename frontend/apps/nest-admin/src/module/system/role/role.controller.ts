import { Controller, Get, Post, Body, Put, Param, Query, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiConsumes, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto, ListRoleDto, ChangeStatusDto } from './dto/index';

@ApiTags('角色管理')
@Controller('system/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    summary: '角色管理-创建',
  })
  @ApiBody({
    type: CreateRoleDto,
    required: true,
  })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({
    summary: '角色管理-列表',
  })
  @ApiBody({
    type: ListRoleDto,
    required: true,
  })
  @Get('/list')
  findAll(@Query() query: ListRoleDto) {
    return this.roleService.findAll(query);
  }

  @ApiOperation({
    summary: '角色管理-部门树',
  })
  @Get('/deptTree/:id')
  deptTree(@Param('id') id: string) {
    return this.roleService.deptTree(+id);
  }

  @ApiOperation({
    summary: '角色管理-详情',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @ApiOperation({
    summary: '角色管理-修改',
  })
  @ApiBody({
    type: UpdateRoleDto,
    required: true,
  })
  @Put()
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }

  @ApiOperation({
    summary: '角色管理-数据权限修改',
  })
  @ApiBody({
    type: UpdateRoleDto,
    required: true,
  })
  @Put('/dataScope')
  dataScope(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.dataScope(updateRoleDto);
  }

  @ApiOperation({
    summary: '角色管理-停用角色',
  })
  @ApiBody({
    type: ChangeStatusDto,
    required: true,
  })
  @Put('/changeStatus')
  changeStatus(@Body() changeStatusDto: ChangeStatusDto) {
    return this.roleService.changeStatus(changeStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') ids: string) {
    const menuIds = ids.split(',').map((id) => +id);
    return this.roleService.remove(menuIds);
  }

  // shandcn 相关接口
  @ApiOperation({
    summary: '用户-getRolePage',
  })
  @Get('/role/page')
  getRolePage() {
    return {
      code: 0,
      data: {
        list: [
          {
            id: 101,
            name: '测试账号',
            code: 'test',
            sort: 0,
            status: 0,
            type: 2,
            remark: '123',
            dataScope: 1,
            dataScopeDeptIds: [],
            createTime: 1609912175000,
          },
          {
            id: 1,
            name: '超级管理员',
            code: 'super_admin',
            sort: 1,
            status: 0,
            type: 1,
            remark: '超级管理员',
            dataScope: 1,
            dataScopeDeptIds: null,
            createTime: 1609837428000,
          },
          {
            id: 2,
            name: '普通角色',
            code: 'common',
            sort: 2,
            status: 0,
            type: 1,
            remark: '普通角色',
            dataScope: 2,
            dataScopeDeptIds: null,
            createTime: 1609837428000,
          },
          {
            id: 3,
            name: 'CRM 管理员',
            code: 'crm_admin',
            sort: 2,
            status: 0,
            type: 1,
            remark: 'CRM 专属角色',
            dataScope: 1,
            dataScopeDeptIds: null,
            createTime: 1708743073000,
          },
          {
            id: 155,
            name: '测试数据权限',
            code: 'test-dp',
            sort: 3,
            status: 0,
            type: 2,
            remark: '',
            dataScope: 2,
            dataScopeDeptIds: [100, 102, 103, 104, 105, 108],
            createTime: 1743404286000,
          },
          {
            id: 158,
            name: '2',
            code: '3',
            sort: 4,
            status: 0,
            type: 2,
            remark: null,
            dataScope: 1,
            dataScopeDeptIds: null,
            createTime: 1744891688000,
          },
        ],
        total: 6,
      },
      msg: '',
    };
  }
}
