import mongoose from "mongoose";
import server from './app.js'

import User from './src/models/User.js';
import Posts from './src/models/Posts.js';
import {posts, users} from './src/data/mookData.js'


const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(() => {
    server.listen(PORT, () => console.log(`Server connect data base && listening  on Por ${PORT}`));

    //mokeo de data una sola vez : 
    // User.insertMany(users);
    // Posts.insertMany(posts)
})
.catch((error) => console.log(`${error} to not connect`))