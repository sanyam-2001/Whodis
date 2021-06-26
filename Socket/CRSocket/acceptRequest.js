const userModel = require('../../Models/userModel');
const roomModel = require('../../Models/roomModel');
const jwt = require('jsonwebtoken');
const acceptRequest = async (io, roomID) => {
    const currentRoom = await roomModel.findOne({ roomID });
    const parseduser1 = jwt.verify(currentRoom.user1, process.env.JWTSECRET);
    const parseduser2 = jwt.verify(currentRoom.user2, process.env.JWTSECRET);
    if (!parseduser1 || !parseduser2) return;

    await userModel.findByIdAndUpdate(parseduser1.id, { "$push": { friends: parseduser2.id } });
    await userModel.findByIdAndUpdate(parseduser2.id, { "$push": { friends: parseduser1.id } });
    io.in(roomID).emit('requestAccepted')

}

module.exports = acceptRequest