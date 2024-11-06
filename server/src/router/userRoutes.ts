import { Router } from 'express';
import { register , login } from '../controller/userController';
import { authenticate } from '../middleware/authMiddleware';
import { user } from '../interface/user';

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/login',login);
userRouter.get('/me', authenticate, (req:user, res) => {
  res.json({
    message: 'You have access to this protected route',
    user: req.user
  });
});

export default userRouter;