import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Role } from '@secure-task-mgmt/data';
import { ROLES_KEY } from './roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    // Get required roles from the handler's metadata
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    if (!requiredRoles) return true; 

    const gqlCtx = GqlExecutionContext.create(ctx).getContext();
    const user = gqlCtx.user;
    
    if (!user) {
      throw new Error('Unauthorized'); // If the user is not found in the context, deny access
    }

    return requiredRoles.includes(user.role); 
  }
}
