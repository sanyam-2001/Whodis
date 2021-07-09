import React, { useState, useEffect, useRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '../../Components/HomeComponents/Drawer/Drawer'
import JWTGET from './../../Requests/Gets';
import styles from './Messages.module.css'
import ContactCard from '../../Components/ContactCards/ContactCard';
import socketIOClient from 'socket.io-client';
import AttachmentIcon from '@material-ui/icons/Attachment';
import SendIcon from '@material-ui/icons/Send';
import Text from './../../Components/Text/Text';
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
const getUserDetails = (arr, id) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === id) return arr[i];
    }
    return {
        id: null,
        dp: null,
        username: null
    }
}
const Messages = () => {
    let scrollRef = useRef(null);
    const isLoggedIn = localStorage.getItem('JWTTOKEN');
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [user, setUser] = useState({
        location: {
            country: "",
            state: ""
        },
        friends: []
    })
    const [friendList, setFriendList] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const [dp, setDp] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchVal, setSearchVal] = useState('');
    const [socket, setSocket] = useState(null);
    const [currentConversation, setCurrentConversation] = useState({});
    const [messages, setMessages] = useState([]);
    const [typedInput, setTypedInput] = useState('');
    useEffect(() => {
        JWTGET('/userDetails')
            .then(res => {
                setUser(res);
                res.friends.forEach(async (friend) => {
                    const dp = await fetch(`/getDp/${friend}`);
                    const parsedDp = await dp.json();
                    const username = await fetch(`/getUsername/${friend}`);
                    const parsedUsername = await username.json();
                    const object = {
                        username: parsedUsername.name,
                        id: friend,
                        dp: parsedDp.src
                    }
                    setFriendList((prev) => [...prev, object])
                });
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
        if (currentUser) {
            JWTGET(`/getConversation/${currentUser}`)
                .then(res => {
                    setCurrentConversation(res.conversation.conversationUID);
                    setMessages(JSON.parse(res.conversation.stringifiedMessages))
                    socket.emit('joinConversation', { roomID: res.conversation.conversationUID, name: user.firstName });
                    if (scrollRef) {
                        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
                    }
                })
        }
    }, [currentUser, socket, user.firstName]);
    useEffect(() => {
        const socket = socketIOClient('/');
        setSocket(socket);
        socket.on('chatMessageSent', (object) => {
            setMessages((prev) => [...prev, object]);
            if (scrollRef) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight
            }

        })
    }, []);
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight

        }
    }, [typedInput])

    const handleSendMessage = () => {
        const date = new Date(Date.now());
        const messagePayload = {
            sender: user.firstName,
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: typedInput,
            senderID: user._id,
            date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        }
        socket.emit('chatMessageSent', { messagePayload, thisRoom: currentConversation });
        setMessages((prev) => [...prev, messagePayload]);
        setTypedInput('')
    }

    if (!isLoggedIn)
        return <Redirect to="/login" />
    const searchCardComponent = friendList.filter(friend => friend.username.includes(searchVal)).map(friend => <ContactCard key={friend.id} id={friend.id} name={friend.username} dp={friend.dp} setCurrentUser={setCurrentUser} currentUser={currentUser} />)
    const textComponent = messages.map((m, i) => {
        if (m.senderID === user._id) {
            return <Text key={i} sender={m.sender} senderID={m.senderID} time={m.time} message={m.message} date={m.date} sentMessage={true} />
        }
        else return <Text key={i} sender={m.sender} senderID={m.senderID} time={m.time} message={m.message} date={m.date} sentMessage={false} />

    })
    return (
        <div >

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
            {/* Main Panel */}

            <div className={styles.mainContainer}>
                <div className={styles.contactContainer}>
                    <div className={styles.identityBar}>
                        <img src={dp} alt="userDP" style={{ height: '50px', width: '50px', borderRadius: '50%' }} />
                        <h3 style={{ fontFamily: `'Encode Sans SC', sans-serif` }}>{user.firstName} {user.lastName}</h3>
                    </div>
                    <div className={styles.searchContact}>
                        <input type="text" className={styles.searchInput} placeholder="Search Contacts..." value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
                    </div>
                    <div className={styles.contactList}>
                        {searchCardComponent.length ? searchCardComponent : <h2 style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>No Contacts</h2>}

                    </div>
                </div>
                <div className={styles.chatBox} style={{ position: 'relative' }}>
                    {!currentUser ?
                        <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '50px' }}>WHO DIS</h1>
                        :
                        <div style={{ height: '100%' }}>
                            <div className={styles.chatHeader}>
                                <img src={getUserDetails(friendList, currentUser).dp} alt="userDP" style={{ height: '50px', width: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                                <h3 style={{ fontFamily: `'Encode Sans SC', sans-serif` }}>{getUserDetails(friendList, currentUser).username}</h3>
                            </div>
                            <div className={styles.stringifiedMessages} ref={scrollRef}>
                                {textComponent}
                            </div>
                            <div className={styles.textContainerInput}>
                                <AttachmentIcon style={{ color: 'white', cursor: 'pointer' }} fontSize="large" />
                                <input type="text" placeholder="Type a Message..." value={typedInput} onChange={(e) => setTypedInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendMessage()} />
                                <SendIcon style={{ color: 'white', cursor: 'pointer' }} fontSize="large" onClick={handleSendMessage} />
                            </div>
                        </div>
                    }
                </div>
            </div>

        </div >
    );
}

export default Messages;