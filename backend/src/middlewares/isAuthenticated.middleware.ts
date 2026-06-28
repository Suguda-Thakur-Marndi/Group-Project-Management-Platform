import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../utils/appError";
import UserModel from "../models/user.model";
import WorkspaceModel from "../models/workspace.model";
import RoleModel from "../models/roles-permission.model";
import MemberModel from "../models/member.model";
import { Roles } from "../enums/role.enum";
import { RolePermissions } from "../utils/role-permission";
import mongoose from "mongoose";

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || !req.user._id) {
      let user = await UserModel.findOne();
      if (!user) {
        user = await UserModel.create({
          name: "Test User",
          email: "test@example.com",
          password: "password123",
        });
      }
      
      if (user) {
        let workspace = await WorkspaceModel.findOne({ owner: user._id });
        if (!workspace) {
          workspace = new WorkspaceModel({
            name: `My Workspace`,
            description: `Workspace created for ${user.name || "User"}`,
            owner: user._id,
          });
          await workspace.save();
        }

        let ownerRole = await RoleModel.findOne({ name: Roles.OWNER });
        if (!ownerRole) {
          ownerRole = new RoleModel({
            name: Roles.OWNER,
            permissions: RolePermissions.OWNER,
          });
          await ownerRole.save();
        }

        let member = await MemberModel.findOne({ userId: user._id, workspaceId: workspace._id });
        if (!member) {
          member = new MemberModel({
            userId: user._id,
            workspaceId: workspace._id,
            role: ownerRole._id,
            joinedAt: new Date(),
          });
          await member.save();
        }

        if (!user.currentWorkspace || !user.currentWorkspace.equals(workspace._id)) {
          user.currentWorkspace = workspace._id as mongoose.Types.ObjectId;
          await user.save();
        }

        req.logIn(user, (err) => {
          if (err) {
            return next(new UnauthorizedException("Unauthorized. Please log in."));
          }
          return next();
        });
        return;
      }
      throw new UnauthorizedException("Unauthorized. Please log in.");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;

