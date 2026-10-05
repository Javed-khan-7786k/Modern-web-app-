import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid corporate or academic email',
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters',
  }),
  role: Joi.string().valid('super_admin', 'school_admin', 'teacher', 'student', 'parent', 'accountant').optional(),
});

export const switchRoleSchema = Joi.object({
  role: Joi.string().valid('super_admin', 'school_admin', 'teacher', 'student', 'parent', 'accountant').required(),
});

export const ledgerCreateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(80).required(),
  code: Joi.string().trim().alphanum().min(2).max(15).uppercase().required(),
  type: Joi.string().valid('asset', 'liability', 'equity', 'revenue', 'expense').required(),
  description: Joi.string().allow('').max(255).default(''),
  openingBalance: Joi.number().min(0).default(0),
});

export const ledgerUpdateSchema = Joi.object({
  name: Joi.string().trim().min(3).max(80).optional(),
  type: Joi.string().valid('asset', 'liability', 'equity', 'revenue', 'expense').optional(),
  description: Joi.string().allow('').max(255).optional(),
  status: Joi.string().valid('active', 'archived').optional(),
});

export const transactionCreateSchema = Joi.object({
  ledgerId: Joi.string().required(),
  type: Joi.string().valid('income', 'expense', 'transfer', 'adjustment').required(),
  amount: Joi.number().positive().precision(2).required().messages({
    'number.positive': 'Transaction amount must be strictly greater than 0',
  }),
  date: Joi.string().isoDate().required(),
  category: Joi.string().trim().min(2).max(60).required(),
  paymentMethod: Joi.string().valid('bank_transfer', 'cash', 'credit_card', 'cheque', 'online_gateway').required(),
  referenceNumber: Joi.string().trim().min(2).max(40).required(),
  description: Joi.string().allow('').max(200).default(''),
});

export const studentCreateSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),
  lastName: Joi.string().trim().min(2).max(50).required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string().isoDate().required(),
  grade: Joi.string().trim().required(),
  section: Joi.string().trim().max(10).required(),
  rollNumber: Joi.string().trim().required(),
  guardianName: Joi.string().trim().min(2).max(80).required(),
  guardianPhone: Joi.string().trim().min(7).max(20).required(),
  guardianEmail: Joi.string().email().required(),
  address: Joi.string().trim().min(5).max(200).required(),
});

export const attendanceMarkSchema = Joi.object({
  records: Joi.array().items(
    Joi.object({
      studentId: Joi.string().required(),
      date: Joi.string().isoDate().required(),
      status: Joi.string().valid('present', 'absent', 'late', 'excused').required(),
      remarks: Joi.string().allow('').max(150).optional(),
    })
  ).min(1).required(),
});

export const feePaymentSchema = Joi.object({
  feeId: Joi.string().required(),
  amount: Joi.number().positive().precision(2).required(),
  paymentMethod: Joi.string().valid('bank_transfer', 'cash', 'credit_card', 'cheque', 'online_gateway').required(),
  referenceNumber: Joi.string().trim().min(2).max(40).required(),
  ledgerId: Joi.string().required(),
});
