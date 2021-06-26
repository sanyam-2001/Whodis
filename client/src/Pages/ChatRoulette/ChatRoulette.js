import React, { useState, useEffect, useRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    TextField,
    LinearProgress

} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '../../Components/HomeComponents/Drawer/Drawer'
import JWTGET from '../../Requests/Gets';
import styles from './ChatRoulette.module.css'
import socketIOClient from 'socket.io-client';
import Message from '../../Components/MessageComponents/Message'

const socket = socketIOClient('/');
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));
const ChatRoulette = () => {
    let chatRef = useRef(null);
    const isLoggedIn = localStorage.getItem('JWTTOKEN');

    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [user, setUser] = useState({})
    const [coverImage, setCoverImage] = useState(null);
    const [dp, setDp] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [inChat, setInChat] = useState(false);
    const [requestModal, setRequestModel] = useState(false);
    const [friendRequestRecieved, setFriendRequestRecieved] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [room, setRoom] = useState({
        user1: null,
        user1ID: null,
        user2: null,
        user2ID: null,
        roomID: null,
        status: null
    });
    const [open, setOpen] = useState(false);
    useEffect(() => {
        JWTGET('/userDetails')
            .then(res => {
                setUser(res);
            });
        JWTGET('/coverImage')
            .then(res => {
                if (res.src) {
                    setCoverImage(res.src);
                }
            })
        JWTGET('/dp')
            .then(res => {
                if (res.src) {
                    setDp(res.src)
                }
            });
    }, []);

    useEffect(() => {
        socket.on('joinedRoom', (roomDetails) => {
            setRoom(roomDetails);
            console.log(roomDetails)
            if (roomDetails.user2) {
                setOpen(false);
                setInChat(true);
                setMessages([{ sender: "SYSTEM", message: "STRANGER JOINED!" }]);
                setCount(0);

            }
        });
        socket.on('messageRecieved', (obj) => {
            setMessages((prev) => [...prev, { sender: "Stranger", time: obj.time, message: obj.message }]);
            setCount(prev => prev + 1);

        });
        socket.on('friendRequestRecieved', () => {
            setRequestModel(true);
            setFriendRequestRecieved(true);
        });
        socket.on('requestDeclined', () => {
            setRequestModel(false);
            setMessages((prev) => [...prev, { sender: "SYSTEM", message: "Request Declined!" }]);

        })
        socket.on('requestAccepted', () => {
            setIsFriend(true);
            setRequestModel(false);
            setMessages((prev) => [...prev, { sender: "SYSTEM", message: "Request Accepted!" }]);

        })
        socket.on('destroyRoom', async () => {
            setInChat(false);
            setMessages((prev) => [...prev, { sender: "SYSTEM", message: "CHAT ENDED" }]);
            setCount(prev => prev + 1);
            setRoom({
                user1: null,
                user1ID: null,
                user2: null,
                user2ID: null,
                roomID: null,
                status: null
            });

        })

        return () => {
            socket.disconnect()
        }
    }, [])
    useEffect(() => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }, [count]);



    const handleEndNew = () => {
        if (!inChat) {
            socket.emit('findNewChatRoulette', { JWTTOKEN: localStorage.getItem('JWTTOKEN') });
            setOpen(true);
        }
        else {
            socket.emit('destroyRoom', room.roomID);

        }
    }
    const sendMessage = () => {
        if (message && room.roomID) {
            socket.emit('sendMessage', { roomID: room.roomID, message });
            const date = new Date(Date.now());
            setMessages((prev) => [...prev, { sender: "You", message: message, time: `${date.getHours()}:${date.getMinutes()}` }]);
            setCount(prev => prev + 1);
            setMessage('');

        }
    }
    const sendRequest = () => {
        if (room.user2 && !isFriend) {
            socket.emit('sendRequest', room.roomID);
            setRequestModel(true);
            setFriendRequestRecieved(false);
        }
    }

    const messageGroup = messages.map((m, i) => <Message time={m.time} message={m.message} sender={m.sender} key={i} />)
    if (!isLoggedIn)
        return <Redirect to="/login" />

    return (
        <div >
            <div className={styles.modal} style={{ display: open ? "flex" : 'none' }}>
                <div className={styles.innerModal}>
                    <h1 style={{ fontSize: '50px' }}>Loading</h1>
                    <LinearProgress />
                    <h1>Joining a Stranger</h1>
                </div>
            </div>
            <div className={styles.modal} style={{ display: requestModal ? 'flex' : 'none' }}>
                <div className={styles.innerModal} style={{ display: friendRequestRecieved ? "none" : 'block' }}>
                    <h2>Friend Request Sent</h2>
                </div>

                <div className={styles.innerModal} style={{ display: friendRequestRecieved ? "block" : "none" }}>
                    <h2>Friend Request Recieved</h2>
                    <div style={{ margin: '8px', display: 'flex', justifyContent: 'space-around' }}>
                        <Button variant="contained" style={{ backgroundColor: '#70deff' }} onClick={() => socket.emit('requestAccepted', room.roomID)}>Accept</Button>
                        <Button variant="contained" style={{ backgroundColor: '#ff7085' }} onClick={() => socket.emit('requestDeclined', room.roomID)}>Decline</Button>
                    </div>
                </div>

            </div>
            <Drawer
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                backgroundImage={coverImage}
                profileImage={dp}
                name={`${user.firstName} ${user.lastName}`}
                email={user.email}
            />
            <div>
                <div className={classes.root}>
                    <AppBar position="static" style={{ backgroundColor: 'black' }}>
                        <Toolbar>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Who-Dis?
                            </Typography>
                            <Link to="/home">
                                <Button style={{ textDecoration: 'none', color: 'white' }}>Back</Button>
                            </Link>
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
            <div style={{ marginTop: '20px', textAlign: 'right', width: '90%' }}>
                <Button variant="outlined" color="primary" onClick={sendRequest}>Add Friend</Button>
            </div>
            <div className={styles.messageContainer} style={{ overflowX: 'hidden', overflowY: 'scroll' }} ref={chatRef}>
                {messageGroup}
            </div>
            <div className={styles.footInput}>
                <div className={styles.escapePanel}>
                    <Button variant="contained" style={{ width: '100%', padding: '15px' }} onClick={handleEndNew}>{inChat ? "END" : "NEW"}</Button>
                </div>
                <div className={styles.textAreaPanel}>
                    <TextField
                        variant="outlined"
                        placeholder="Your Message..."
                        style={{ backgroundColor: '#E0E0E0', borderRadius: '4px' }}
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => { if (e.key === "Enter") sendMessage() }}
                    />
                </div>
                <div className={styles.sendPanel}>
                    <Button variant="contained" disabled={message ? false : true} style={{ width: '100%', padding: '15px' }} onClick={sendMessage} >Send</Button>
                </div>
            </div>
        </div>
    );
}

export default ChatRoulette;