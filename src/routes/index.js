import Router from 'express';
import userRoutes from './router.user.js';
import postsRoutes from './routerPosts.js';


const router = Router();

router.use('/auth', userRoutes);
router.use('/posts', postsRoutes)



export default router;