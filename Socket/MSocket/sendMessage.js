const conversationModel = require('../../Models/conversationModel')
const sendMessage = async (socket, roomID, object) => {
    const prev = await conversationModel.findOne({ conversationUID: roomID });
    const prevMessage = JSON.parse(prev.stringifiedMessages);
    prevMessage.push(object);
    await conversationModel.findOneAndUpdate({ conversationUID: roomID }, { stringifiedMessages: JSON.stringify(prevMessage) });
    socket.to(roomID).emit("chatMessageSent", object);
}

module.exports = sendMessage;