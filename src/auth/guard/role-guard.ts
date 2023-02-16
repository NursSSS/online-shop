import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/user/enum/role-decorator";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly JwtService: JwtService,
        private readonly reflector: Reflector
    ){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        try {
            const reqRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if(!reqRoles){
                return true
            }

            const req = context.switchToHttp().getRequest()
            const authHead = req.headers.authorization; 
            const bearer = authHead.split(' ')[0]
            const token = authHead.split(' ')[1]


            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException('User is not registered')
            }

            const user = this.JwtService.verify(token)
            req.user = user

            return user.roles.some(role => reqRoles.includes(role.value))
        } catch (e){
            throw new ForbiddenException('No access')
        }
    }
}