const jwt = require('jsonwebtoken');
const roomModel = require('../../Models/roomModel');
const userModel = require('../../Models/userModel');
const { v4: uuidv4 } = require('uuid');
const findNewChatRoulette = async (socket, JWTTOKEN, io) => {
    //Get all Rooms
    const parsed = jwt.verify(JWTTOKEN, process.env.JWTSECRET);
    const { friends } = await userModel.findById(parsed.id);
    const roomList = await roomModel.find({});
    const availableRooms = roomList.filter((i) => i.status);

    let selectedRoom = null;
    for (i = 0; i < availableRooms.length; i++) {
        const parsedTemp = jwt.verify(availableRooms[i].user1, process.env.JWTSECRET);
        if (!friends.includes(parsedTemp.id)) {
            selectedRoom = availableRooms[i];
            break;
        }
    }
    if (selectedRoom) {
        const updatedRoom = await roomModel.findOneAndUpdate({ roomID: selectedRoom.roomID }, { status: false, user2: JWTTOKEN, user2ID: socket.id }, { new: true });
        socket.join(updatedRoom.roomID);
        io.in(updatedRoom.roomID).emit('joinedRoom', updatedRoom);

    }
    //Create New Room
    else {
        const newRoomID = uuidv4();
        const newRoom = new roomModel({
            user1: JWTTOKEN,
            user1ID: socket.id,
            user2: null,
            user2ID: null,
            roomID: newRoomID,
            status: true
        });
        const savedNewRoom = await newRoom.save();
        socket.join(savedNewRoom.roomID);
        io.in(savedNewRoom.roomID).emit('joinedRoom', savedNewRoom);

    }


}

module.exports = findNewChatRoulette;