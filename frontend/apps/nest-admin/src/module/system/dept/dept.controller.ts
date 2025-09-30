import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiConsumes, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { DeptService } from './dept.service';
import { CreateDeptDto, UpdateDeptDto } from './dto/index';

@ApiTags('部门管理')
@Controller('system/dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @ApiOperation({
    summary: '部门管理-创建',
  })
  @ApiBody({
    type: CreateDeptDto,
    required: true,
  })
  @Post()
  @HttpCode(200)
  create(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.create(createDeptDto);
  }

  @ApiOperation({
    summary: '部门管理-列表',
  })
  @Get('/list')
  findAll() {
    return this.deptService.findAll();
  }

  @ApiOperation({
    summary: '部门管理-详情',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deptService.findOne(+id);
  }

  @ApiOperation({
    summary: '部门管理-黑名单',
  })
  @Get('/list/exclude/:id')
  findListExclude(@Param('id') id: string) {
    return this.deptService.findListExclude(id);
  }

  @ApiOperation({
    summary: '部门管理-更新',
  })
  @ApiBody({
    type: UpdateDeptDto,
    required: true,
  })
  @Put()
  update(@Body() updateDeptDto: UpdateDeptDto) {
    return this.deptService.update(updateDeptDto);
  }

  @ApiOperation({
    summary: '部门管理-删除',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deptService.remove(+id);
  }

  // shandcn 相关接口
  @ApiOperation({
    summary: '部门管理-简单列表',
  })
  @Get('/simple-list')
  findSimpleList() {
    // this.deptService.findAll() ||
    return {
      code: 0,
      data: [
        {
          id: 100,
          name: '芋道源码',
          parentId: 0,
        },
        {
          id: 101,
          name: '深圳总公司',
          parentId: 100,
        },
        {
          id: 103,
          name: '研发部门',
          parentId: 101,
        },
        {
          id: 108,
          name: '市场部门',
          parentId: 102,
        },
        {
          id: 102,
          name: '长沙分公司',
          parentId: 100,
        },
        {
          id: 104,
          name: '市场部门',
          parentId: 101,
        },
        {
          id: 109,
          name: '财务部门',
          parentId: 102,
        },
        {
          id: 105,
          name: '测试部门',
          parentId: 101,
        },
        {
          id: 106,
          name: '财务部门',
          parentId: 101,
        },
        {
          id: 107,
          name: '运维部门',
          parentId: 101,
        },
      ],
      msg: '',
    };
  }
}
