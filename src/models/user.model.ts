import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRole {
  OrgAdmin = 'OrgAdmin',
  Member = 'Member',
  Support = 'Support',
}

export interface OrgRole {
  orgId: Types.ObjectId;
  role: UserRole;
}

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  auth0Id: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop([{
    orgId: { type: Types.ObjectId, ref: 'Organization', required: true },
    role: { type: String, enum: UserRole, required: true },
  }])
  orgRoles: OrgRole[];

  @Prop()
  lastLoginAt?: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User); 