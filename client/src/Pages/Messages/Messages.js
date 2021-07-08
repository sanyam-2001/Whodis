import React, { useState, useEffect } from 'react';
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
const Messages = () => {
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
    const [coverImage, setCoverImage] = useState(null);
    const [dp, setDp] = useState(null);
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

    if (!isLoggedIn)
        return <Redirect to="/login" />

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
                        <input type="text" className={styles.searchInput} placeholder="Search Contacts..." />
                    </div>
                    <div className={styles.contactList}>
                        <h2 style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>No Contacts</h2>
                    </div>
                </div>
                <div className={styles.chatBox}>

                </div>
            </div>

        </div>
    );
}

export default Messages;