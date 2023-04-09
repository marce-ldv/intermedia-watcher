import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

// Collaborators: JWTService
export class JWTService {
  // add salt to the password
  generateToken(payload: string | any): string {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1d'
    });

    return token;
  }

  verifyToken(token: string): boolean | any {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (err) {
      return false;
    }
  }
}
