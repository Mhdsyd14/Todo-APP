import jwt from 'jsonwebtoken';

interface TokenPayload {
  id?: number;
  email?: string;
  username?: string;
}

export const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  const expiresIn = process.env.EXPIRE || '1h';

  return jwt.sign(payload, secret, { expiresIn });
};
