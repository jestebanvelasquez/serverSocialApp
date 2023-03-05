export const getFriendsIds = async (arrayIds) => {
    try {
        // hacemos el llamado a la Bd de cada amigo
        const friends = await Promise.all(
            arrayIds.map((id) => User.findById(id))
        )

        // formateamos la data de los friends para devolver solo lo que necesitamos:
        const friendsData = friends.map(({_id, firstName, lastName,email, picturePath, location, occupation }) => {
            return {
                _id, firstName, lastName,email, picturePath, location, occupation 
            }
        })

        return friendsData;
    } catch (error) {
        return error
    }
}