const roomModel = require('../../Models/roomModel')
const destroyRoom = async (io, roomID) => {
    io.in(roomID).emit('destroyRoom');
    const deletionStatus = await roomModel.findOneAndDelete({ roomID });
}


module.exports = destroyRoom;