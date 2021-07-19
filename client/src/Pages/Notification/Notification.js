import React, { useEffect, useState } from 'react';
import styles from './Notification.module.css';
import defaultCover from '../../defaultCover.jpg'
import defaultImage from '../../default.jpg'
import { Button } from '@material-ui/core';
import JWTGET from './../../Requests/Gets';
const Element = (props) => {
    const [visible, setVisible] = useState(true);
    return (<div className={styles.card} style={{ display: visible ? "block" : 'none' }}>
        <div className={styles.backgroundImage} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(${props.cover || defaultCover})`, height: '17.5vh', borderRadius: '8px' }}></div>
        <img src={props.dp || defaultImage} alt="DP" style={{ height: '50px', width: '50px', objectFit: 'cover', borderRadius: '50%', transform: 'translateY(-50%)', position: 'absolute', right: '5%' }} />
        <div className={styles.action}>
            <h2 style={{ fontFamily: 'monospace' }}>{props.name}</h2>
            <div style={{ marginTop: '12px' }}>
                <Button style={{ color: '#459cff' }} onClick={() => {
                    JWTGET(`/acceptNotification/${props.id}`)
                        .then(res => {
                            setVisible(false);
                            console.log(res);
                        })
                }}>Accept</Button>
            </div>
        </div>
    </div>)

}

const Notification = () => {
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        JWTGET(`/notificationInfo`)
            .then((res) => {
                res.list.forEach(async (value) => {
                    const dp = await fetch(`/getDp/${value}`);
                    const cover = await fetch(`/coverImage/${value}`);
                    const name = await fetch(`/getUsername/${value}`);
                    const dpJson = await dp.json();
                    const coverJson = await cover.json();
                    const nameJson = await name.json();
                    setRequests((prev) => [...prev, { name: nameJson.name, dp: dpJson.src, cover: coverJson.src, key: value }])
                })
            })
    }, []);

    const elements = requests.map((m, i) => <Element key={i} id={m.key} dp={m.dp} cover={m.cover} name={m.name} />)

    return (
        <div className={styles.main}>
            <div className={styles.left}></div>
            <div className={styles.right}></div>
            <div className={styles.banner} style={{ position: 'absolute', right: 0, top: 0, writingMode: 'vertical-lr', fontSize: '72px', height: '100vh', marginRight: '2.5%', textAlign: 'center', color: 'white' }}>
                NOTIFICATIONS
            </div>
            <div className={styles.scroll} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', height: '60vh', backgroundColor: 'rgb(20, 20, 20)', padding: '16px', overflow: 'hidden scroll' }}>
                {elements.length ? elements :
                    <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: 'monospace', color: 'white', width: '100%', textAlign: 'center' }}>
                        No Notifications
                    </h1>
                }
            </div>
        </div>
    );
}

export default Notification;