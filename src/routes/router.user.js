import  Router from 'express';
import { authController } from '../controllers/authController.js';
import { UserController } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authorization.js';


const userRoutes = Router();


userRoutes.post('/login',  authController.login)
userRoutes.get('/:id', verifyToken, UserController.getUserId)
userRoutes.get('/:id/friends', verifyToken, UserController.getUserFriends)


userRoutes.patch('/:id/:friendId', verifyToken, UserController.addRemoveFriends)


export default userRoutes;