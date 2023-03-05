import mongoose from 'mongoose';

const UserSchema =  new mongoose.Schema({
        firstName :{
            type: String,
            required:true,
            min:2,
            max:50
        },
        lastName :{
            type: String,
            required:true,
            min:2,
            max:50
        },
        email :{
            type: String,
            required:true,
            unique:true,
            max:50
        },
        password :{
            type: String,
            required:true,
            min:5
        },
        picturePath :{
            type: String,
            default:''
        },
        friends:{
            type: Array,
            default:[]
        },
        location:{
            type: String
        },
        occupation:{
            type: String
        },
        viewedProfile:{
            type: Number
        },
        impressions:{
            type: Number
        }
},
    {timestamps:true} // para saber fechas de actualizacion y creacion 
)

const User = mongoose.model('User',UserSchema);
export default User;