import { Router } from "express";
import { verifyToken } from "../middleware/authorization.js";
import { postsController } from "../controllers/postsController.js";
const postsRoutes = Router();

// traer los posts 
postsRoutes.get('/', verifyToken, postsController.getFeedPosts)
// postsRoutes.get('/',  postsController.getFeedPosts)


// traer los posts de un usuario en particular
postsRoutes.get('/userId/posts', verifyToken, postsController.getUserPosts)

// editar el posts segun el like:
postsRoutes.patch('/:id/like', verifyToken, postsController.likePosts)


export default postsRoutes;