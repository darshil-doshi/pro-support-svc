import { Types } from 'mongoose';
import { UserDocument } from '../../models/user.model';

export class UserResponse {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  orgRoles: Array<{ orgId: string; role: string }>;

  static mapFromDocument(user: UserDocument): UserResponse {
    const response: UserResponse = new UserResponse();
    response.id = (user._id as Types.ObjectId).toString();
    response.email = user.email;
    response.firstName = user.firstName;
    response.lastName = user.lastName;
    response.orgRoles = user.orgRoles.map(role => ({
      orgId: (role.orgId as Types.ObjectId).toString(),
      role: role.role,
    }));
    return response;
  }
} 