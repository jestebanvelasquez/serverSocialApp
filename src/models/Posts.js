import mongoose from "mongoose";

const PostsSchema = new mongoose.Schema({
    userId :{
        type: String,
        required:true,
    },
    firstName:{
        type:String,
        required: true,
    },
    lastName :{
        type: String,
        required:true,
    },
    location:{
        type: String
    },
    description:{
        type: String
    },
    picturePath:String,
    userPicturePath:String,
    likes: {
        type:Map,
        of: Boolean
    },
    comments:{
        types:Array,
        default:[]
    }

},
    {timestamps: true}
);

const Posts = mongoose.model('Posts', PostsSchema);
export default Posts;