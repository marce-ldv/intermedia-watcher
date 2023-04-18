import { User } from '../domain/User';
import { HashPasswordService } from './HashPasswordService';

export class ValidateUserService {
  validateUserPassword(user: User, bodyPassword: string): boolean {
    const hashPasswordService = new HashPasswordService();
    return hashPasswordService.compare(bodyPassword, user.password);
  }
}
