import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { toast, ToastContainer } from 'react-toastify'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import styles from './Drawer.module.css'
import SettingsIcon from '@material-ui/icons/Settings';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Redirect, Link } from 'react-router-dom'
import { Button } from '@material-ui/core';
import JWTGET from './../../../Requests/Gets';

const useStyles = makeStyles({
    list: {
        width: 280,
    },
    fullList: {
        width: 'auto',
    },
});

function Drawer(props) {
    const classes = useStyles();
    const [signedOut, setSignedOut] = useState(localStorage.getItem('JWTTOKEN'));
    const [id, setId] = useState('');
    useEffect(() => {
        JWTGET(`/myUserID`)
            .then(res => {
                setId(res.id);
            })
    }, [])
    const copyCode = () => {
        if (id) {
            copyToClipboard();
            toast('Share the Code With Your Friends!')
        }
    }
    function copyToClipboard() {
        navigator.clipboard.writeText(id)
    }
    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={() => props.setDrawerOpen(false)}
            onKeyDown={() => props.setDrawerOpen(false)}
        >
            <List>
                <ListItem>
                    <ListItemText className={styles.drawerImage} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${props.backgroundImage})` }}>
                        <div className={styles.centerPlay}>
                            <ListItemText>
                                <img src={props.profileImage} alt="DP" height="40px" width="40px" style={{ borderRadius: '50%' }} />
                            </ListItemText>
                            <h3>{props.name}</h3>
                            <h6>{props.email}</h6>
                        </div>
                    </ListItemText>
                </ListItem>
            </List>
            <Divider />
            <List>

                <Link to="/chatRoulette" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button className={styles.afterHover}>
                        <ListItemIcon><PersonAddIcon /></ListItemIcon>
                        <ListItemText primary={"Make Friends"} />
                    </ListItem>
                </Link>
                <Link to="/messaging" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button className={styles.afterHover}>
                        <ListItemIcon><ChatIcon /></ListItemIcon>
                        <ListItemText primary={"Messages"} />
                    </ListItem>
                </Link>
                <ListItem button className={styles.afterHover}>
                    <ListItemIcon><EqualizerIcon /></ListItemIcon>
                    <ListItemText primary={"Feed"} />
                </ListItem>
                <Link to="/notification" style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem button className={styles.afterHover}>
                        <ListItemIcon><NotificationsIcon /></ListItemIcon>
                        <ListItemText primary={"Notifications"} />
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>

                <ListItem button className={styles.afterHover} >
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                    <ListItemText primary={"My Account"} />
                </ListItem>
                <ListItem button className={styles.afterHover} >
                    <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                    <ListItemText primary={"Change Password"} />
                </ListItem>
                <ListItem button className={styles.afterHoverRed} onClick={() => { localStorage.removeItem('JWTTOKEN'); setSignedOut(false) }} >
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary={"Sign Out"} />
                </ListItem>
                <Divider />
                <div style={{ width: '90%', margin: 'auto', marginTop: '2.5%' }}>
                    <Button style={{ width: '100%' }} onClick={copyCode}>
                        {id}
                    </Button>
                </div>

            </List>
        </div >
    );

    if (!signedOut) {
        return <Redirect to="/login" />
    }
    return (
        <div>
            <ToastContainer />
            <React.Fragment>
                <SwipeableDrawer
                    anchor={"left"}
                    open={props.drawerOpen}
                    onClose={() => props.setDrawerOpen(false)}
                    onOpen={() => props.setDrawerOpen(true)}
                >
                    {list("left")}
                </SwipeableDrawer>
            </React.Fragment>

        </div>
    );
}
export default Drawer
