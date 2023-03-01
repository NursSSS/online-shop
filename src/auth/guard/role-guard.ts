import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Roles, ROLES_KEY } from 'src/user/enum/role-decorator';
import { UserRole } from 'src/user/enum/role.enum';
9
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly JwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const reqRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!reqRoles) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHead = req.headers.authorization;
      const bearer = authHead.split(' ')[0];
      const token = authHead.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('User is not registered');
      }

      let user = this.JwtService.verify(token);
      req.user = user;

      if(user.role === UserRole.ADMIN){
        return true
      } else {
        return false
      }

    } catch (e) {
      throw new ForbiddenException('Access denied');
    }
  }
}
