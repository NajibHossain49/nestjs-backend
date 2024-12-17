import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  // Create Admin
  async createAdmin(username: string, password: string): Promise<Admin> {
    const newAdmin = this.adminRepository.create({ username, password });
    return this.adminRepository.save(newAdmin);
  }

  // Get All Admins
  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  // Get Admin by ID
  async findOne(id: number): Promise<Admin> {
    return this.adminRepository.findOne({ where: { id } });
  }

  // Update Admin
  async updateAdmin(id: number, updatedData: Partial<Admin>): Promise<Admin> {
    await this.adminRepository.update(id, updatedData);
    return this.findOne(id);
  }

  // Delete Admin
  async deleteAdmin(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
}
