import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service.js';
import { CreateDashboardDto } from './dto/create-dashboard.dto.js';
import { UpdateDashboardDto } from './dto/update-dashboard.dto.js';
// import { AuthGuard } from '../guards/auth.guard.js';
import { Roles } from '../decorators/roles/roles.decorator.js';
import { RolesGuard } from '../guards/roles.guard.js';
import { RoleSystem } from '../decorators/roles/roles.enums.js';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@Controller('dashboard')
// @UseGuards(AuthGuard,RolesGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Post()
  @ApiOperation({
    summary: 'Create dashboard entry',
    description: 'Creates a new entry in the dashboard.',
  })
  create(@Body() createDashboardDto: CreateDashboardDto) {
    return this.dashboardService.create(createDashboardDto);
  }
 
  @Get()
  @Roles([RoleSystem.Admin])
  @ApiOperation({
    summary: 'Get all dashboard data (Admin only)',
    description: 'Retrieves all dashboard entries.',
  })
  findAll() {
    return this.dashboardService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get dashboard entry by ID',
    description: 'Retrieves a single dashboard entry by ID.',
  })
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update dashboard entry',
    description: 'Updates a dashboard entry by ID.',
  })
  update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardService.update(+id, updateDashboardDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete dashboard entry',
    description: 'Deletes a dashboard entry by ID.',
  })
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  }
}
