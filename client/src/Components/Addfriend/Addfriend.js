import React, { useEffect, useRef, useState } from 'react';
import styles from './Addfriend.module.css'
import { gsap } from 'gsap/all';
import defaultImage from '../../default.jpg'
import defaultCover from '../../defaultCover.jpg'
import { Button } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import JWTGET from './../../Requests/Gets';
const Addfriend = (props) => {
    let leftRef = useRef(null);
    let rightRef = useRef(null);
    let mainRef = useRef(null);
    const [code, setCode] = useState(0)
    useEffect(() => {
        if (props.value.length === 24) {
            JWTGET(`/checkFriendStatus/${props.value}`)
                .then(res => setCode(res.code))
        }
    }, [props.value]);

    useEffect(() => {
        if (props.open) {
            const tl = gsap.timeline({ paused: true });
            tl.to(leftRef, { left: 0, duration: 1 })
            tl.to(rightRef, { left: '50%', duration: 1, delay: '-1' })
            tl.to(mainRef, { transform: 'translate(-50%, -50%) scaleX(1)', duration: 0.5 });
            tl.play()
        }
        else {
            const tl = gsap.timeline({ paused: true });
            tl.to(mainRef, { transform: 'translate(-50%, -50%) scaleX(0)', duration: 0.5 });
            tl.to(leftRef, { left: '-100%', duration: 1 })
            tl.to(rightRef, { left: '200%', duration: 1, delay: '-1' })
            tl.play()
        }
    }, [props.open]);

    const addFriends = () => {
        JWTGET(`/sendRequest/${props.value}`)
            .then(res => {
                if (res.code === 200) {
                    setCode(2)
                }
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.backdropLeft} ref={(e) => leftRef = e}></div>
            <div className={styles.backdropRight} ref={(e) => rightRef = e}></div>
            <div className={styles.main} ref={(e) => mainRef = e} style={{ transform: 'translate(-50%, -50%) scaleX(0)' }} >
                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props.cover || defaultCover})`, height: '30vh', backgroundSize: 'cover', borderRadius: '6px' }}></div>
                <div style={{ transform: "translateY(-50%)", position: 'absolute', right: '5%' }}><img src={props.dp || defaultImage} alt="DP" style={{ height: '60px', width: '60px', borderRadius: '50%' }} /></div>
                <div style={{ fontSize: '20px', margin: '5%', fontFamily: 'monospace', fontWeight: 'bold' }}>{props.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '20px' }}>
                    <Button
                        variant="contained"
                        color="default"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => props.setOpen(false)}
                    >
                    </Button>
                    {code === 0 ? null : null}
                    {code === 1 ? <Button variant="contained" startIcon={<CheckCircleIcon />} style={{ backgroundColor: '#50ff4d', color: 'white' }}>Friends</Button> : null}
                    {code === 2 ? <Button variant="contained" startIcon={<AccessTimeIcon />} style={{ backgroundColor: '#ffde4d', color: 'black' }}>Request Sent</Button> : null}
                    {code === 3 ? <Button variant="contained" startIcon={<PersonAddIcon />} style={{ backgroundColor: '#4dc9ff', color: 'white' }} onClick={() => addFriends()}>Add Friend</Button> : null}
                </div>
            </div>
        </div>
    );
}

export default Addfriend;