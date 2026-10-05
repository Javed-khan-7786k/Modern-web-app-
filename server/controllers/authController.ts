import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';
import { loginSchema, switchRoleSchema } from '../validators/joiSchemas.js';

export class AuthController {
  static login(req: Request, res: Response) {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        errors: error.details,
      });
    }

    try {
      const result = AuthService.login(value.email, value.role);
      return res.status(200).json({
        success: true,
        message: 'Authentication successful',
        data: result,
      });
    } catch (err: any) {
      return res.status(401).json({
        success: false,
        message: err.message || 'Authentication failed',
      });
    }
  }

  static switchRole(req: Request, res: Response) {
    const { error, value } = switchRoleSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    try {
      const result = AuthService.switchRole(value.role);
      return res.status(200).json({
        success: true,
        message: `Active session switched to ${value.role}`,
        data: result,
      });
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }

  static getMe(req: Request, res: Response) {
    // In our prototype, if authorization header exists, verify it, otherwise default to current school admin
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const verified = AuthService.verifyToken(token);
      if (verified) {
        return res.status(200).json({
          success: true,
          data: verified,
        });
      }
    }

    // Default demo user
    const defaultUser = AuthService.login('principal@aethel.edu', 'school_admin');
    return res.status(200).json({
      success: true,
      data: defaultUser,
    });
  }
}
