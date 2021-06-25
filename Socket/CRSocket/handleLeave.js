const roomModel = require('../../Models/roomModel');
const destroyRoom = require('./destroyRoom');

const handleLeave = async (socket, io) => {
    const id = socket.id;
    const roomu1 = await roomModel.findOne({ user1ID: id });
    const roomu2 = await roomModel.findOne({ user2ID: id });
    if (!roomu1 && !roomu2) {
        return;
    }
    else if (roomu1) {
        destroyRoom(io, roomu1.roomID);
    }
    else {
        destroyRoom(io, roomu2.roomID);
    }
}

module.exports = handleLeave;