import Posts from '../models/Posts.js'
import User from '../models/User.js';


export const postsController = {
    createPosts: async (req, res) => {
        try {
            const { description, picturePath} = req.body;
            const {userId} = req.user
            const user = await User.findById(userId);
            const newPost = new Posts.create({
                userId: user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                location: user.location,
                userPicturePath:user.picturePath,
                description,
                picturePath,
                likes:{},
                comments:[]
            })

            await newPost.save();
            const posts = await Posts.find();
            return res.status(200).json({data:posts})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    },
    getFeedPosts: async (req, res) => {
        try {
            const posts = await Posts.find();
            return res.status(200).json({data:posts})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    },
    getUserPosts: async (req, res) => {
        try {
            const {id} = req.user ;
            const posts = await Posts.find({
                $where:{
                    userId: id
                },
                
            })

            return res.status(200).json({data:posts});

        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    },
    likePosts: async ( req, res) => {
        try {
            const {idPosts} = req.params;
            const {userId} = req.user;
            const post = await Posts.findById(idPosts);
            // buscamos la id del usuario en los likes del posts
            const isLiked = post.likes.get(userId);
            if(isLiked){
                post.likes.delete(userId)
            }else{
                post.likes.set(userId, true)
            }

            // moficicamos el posts agregando el post o removiendo segun el caso:
            const updatedPost = await Posts.findByIdAndUpdate(
                idPosts,
                {likes:post.likes},
                {new: true}
            )

            return res.status(200).json({data:updatedPost})

        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}