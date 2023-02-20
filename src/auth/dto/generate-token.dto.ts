import { UserRole } from "src/user/enum/role.enum"

export class GenerateToken {
    id: number
    phoneNumber: string
    firstName: string
    role: UserRole
}