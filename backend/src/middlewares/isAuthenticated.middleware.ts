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
    if (req.isAuthenticated && req.isAuthenticated()) {
      return next();
    }
    throw new UnauthorizedException("Unauthorized. Please log in.");
  } catch (error) {
    next(error);
  }
};

export default isAuthenticated;

