import User from '../models/User.js';
import { getFriendsIds } from '../utils/getfriends.js';



export const UserController = {
    getUserId: async (req, res) => {
        try {
            let { id } = req.user
            const user = await User.findById(id)
            if (!user) return res.status(404).json({ error: 'User not found.' })
            return res.status(200).json({ data: user })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    getUserFriends: async (req, res) => {
        try {
            const {id} = req.user;
            const user = await User.findById(id);

            //funcion que trae todos los amigos de la Bd:
            const friends = await getFriendsIds(user.friends)

            return res.status(200).json({data: friends})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    },
    addRemoveFriends: async (req, res) => {
        try {
            const {idUser} = req.user
            const {idFriend} = req.params
            const user = await User.findById(idUser);
            const friend = await User.findById(idFriend);

            if(user.friends.includes(idFriend)) {
                // eliminamos el amigo de la lista
                user.friends = user.friends.filter(us => us.id !== idFriend)
                // al igual eliminamos a el usuario de la lista de su amigo
                friend.friends = friend.friends.filter(us => us.id !== idUser)
            }else{
                // si no esta incluido agregamos en el array de cada uno su respectiva id 
                user.friends.push(idFriend)
                friend.friends.push(idUser)
            }
            // guardamos los cambios en la Bd;
            await user.save();
            await friend.save();

            //funcion que trae todos los amigos de la Bd:
            const friends = await getFriendsIds(user.friends)

            return res.status(200).json({data:friends})
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }       
}