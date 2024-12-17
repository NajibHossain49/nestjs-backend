import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // Create Admin
  @Post()
  async createAdmin(@Body() body: { username: string; password: string }): Promise<Admin> {
    return this.adminService.createAdmin(body.username, body.password);
  }

  // Get All Admins
  @Get()
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  // Get Admin by ID
  @Get(':id')
  async getAdminById(@Param('id') id: number): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  // Update Admin
  @Put(':id')
  async updateAdmin(@Param('id') id: number, @Body() body: Partial<Admin>): Promise<Admin> {
    return this.adminService.updateAdmin(id, body);
  }

  // Delete Admin
  @Delete(':id')
  async deleteAdmin(@Param('id') id: number): Promise<string> {
    await this.adminService.deleteAdmin(id);
    return `Admin with ID ${id} deleted successfully.`;
  }
}
