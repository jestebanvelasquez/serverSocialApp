import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from '../models/User.js';


/* REGISTER USER */


export const authController = {
    register : async(req, res) => {
        try {
            const {
                firstName,
                lastName,
                email,
                password,
                picturePath,
                friends,
                location,
                occupation,
            }= req.body
            const userExist = await User.findOne({email})

            if(userExist) return res.status(400).json({error:`User with email ${email} exists`})

            const salt = await bcrypt.genSalt()// generar 10 rondas por defecto
            const passwordHash = await bcrypt.hash(password, salt)
    
            const newUser = new User({
                firstName,
                lastName,
                email,
                password: passwordHash,
                picturePath,
                friends,
                location,
                occupation,
                viewedProfile:Math.floor(Math.random() * 10000),// por ahora se le da un numero random
                impressions:Math.floor(Math.random() * 10000)// por ahora se le da un numero random
            });
    
            const savedUser = await newUser.save();
            return res.status(200).json({data:savedUser})
    
        } catch (error) {
            return res.status(400).json({error:error.message})
        }
    },
    login: async (req, res) => {
        try {
            const {
                email,
                password
            } = req.body

            const user = await User.findOne({email});
            if(!user) return res.status(400).json({error:`User does not exist.`})
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) return res.status(400).json({error:`User invalid credentials .`})

            const token = Jwt.sign({id: user._id}, process.env.JWT_SECRET);
            delete user.password; // para no regresar la contraseña;
            return res.status(200).json({ token, user })
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }
}

