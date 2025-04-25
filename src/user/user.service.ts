import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument, UserRole } from '../models/user.model';
import { Organization, OrganizationDocument } from '../models/organization.model';
import { UserRegisterRequest, UserRegisterInviteRequest } from './dto/user.request';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Organization.name) private readonly organizationModel: Model<OrganizationDocument>,
  ) {}

  async registerUser(registerDto: UserRegisterRequest): Promise<UserDocument> {
    // Check if user already exists
    const existingUser: UserDocument | null = await this.userModel.findOne({ email: registerDto.email });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Create user with a new ObjectId
    const userId: Types.ObjectId = new Types.ObjectId();
    const user: UserDocument = new this.userModel({
      _id: userId,
      email: registerDto.email,
      auth0Id: registerDto.auth0Id,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      orgRoles: [],
      isActive: true,
    });

    // If organization name is provided, create organization
    if (registerDto.organizationName) {
      const organization: OrganizationDocument = new this.organizationModel({
        name: registerDto.organizationName,
        createdBy: userId,
        isActive: true,
        members: [userId],
      });
      
      const savedOrg: OrganizationDocument = await organization.save();
      
      // Assign user as OrgAdmin
      user.orgRoles.push({
        orgId: savedOrg._id as Types.ObjectId,
        role: UserRole.OrgAdmin,
      });
    }

    return user.save();
  }

  async registerViaInvite(registerDto: UserRegisterInviteRequest): Promise<UserDocument> {
    // Check if user already exists
    const existingUser: UserDocument | null = await this.userModel.findOne({ email: registerDto.email });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // TODO: Verify invite token and get organization ID
    // This would typically involve a separate invite service
    const inviteData: { organizationId: string; role?: UserRole } | null = await this.verifyInviteToken(registerDto.inviteToken);
    if (!inviteData) {
      throw new BadRequestException('Invalid invite token');
    }

    // Create user with a new ObjectId
    const userId: Types.ObjectId = new Types.ObjectId();
    const user: UserDocument = new this.userModel({
      _id: userId,
      email: registerDto.email,
      auth0Id: registerDto.auth0Id,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      orgRoles: [{
        orgId: new Types.ObjectId(inviteData.organizationId),
        role: inviteData.role || UserRole.Member,
      }],
      isActive: true,
    });

    // Add user to organization's members
    await this.organizationModel.findByIdAndUpdate(
      inviteData.organizationId,
      { $push: { members: userId } },
    );

    return user.save();
  }

  private async verifyInviteToken(token: string): Promise<{ organizationId: string; role?: UserRole } | null> {
    // TODO: Implement invite token verification
    // This would typically involve a separate invite service
    // For now, returning null to indicate invalid token
    return null;
  }
} 