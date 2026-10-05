import jwt from 'jsonwebtoken';
import { db } from '../models/mockDb.js';
import { UserRole, User } from '../types/index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'aethel_secure_jwt_secret_token_2026';

export class AuthService {
  static login(email: string, role?: UserRole) {
    let user: User | undefined;
    if (role) {
      user = db.getUserByRole(role);
    } else {
      user = db.getUserByEmail(email);
    }

    if (!user) {
      // Fallback to first school admin
      user = db.getUsers()[1];
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        schoolId: user.schoolId,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    db.logAudit({
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: 'LOGIN',
      resource: 'Auth',
      resourceId: user.id,
      details: `User signed in with role ${user.role} (${user.email})`,
    });

    return { user, token };
  }

  static switchRole(newRole: UserRole) {
    const user = db.getUserByRole(newRole);
    if (!user) {
      throw new Error(`No demo account configured for role ${newRole}`);
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        schoolId: user.schoolId,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return { user, token };
  }

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET) as {
        id: string;
        email: string;
        name: string;
        role: UserRole;
        schoolId: string;
      };
    } catch {
      return null;
    }
  }
}
