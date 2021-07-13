import React, { useEffect, useState } from 'react';
import defaultImage from '../../default.jpg'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import styles from './FriendPanel.module.css'
import JWTGET from './../../Requests/Gets';
import { toast, ToastContainer } from 'react-toastify';
const TempPanel = (props) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const handleDelete = () => {
        JWTGET(`/removeFriend/${props.id}`)
            .then(res => {
                if (res.code === 200) {
                    setIsDeleted(true);
                    toast('Friend Removed!')
                }
            })
    }
    return (
        <article className={styles.leaderboard__profile} style={{ display: isDeleted ? 'none' : 'flex' }}>
            <img src={props.dp || defaultImage} alt={props.username} className={styles.leaderboard__picture} />
            <span className={styles.leaderboard__name}>{props.username}</span>
            <span className={styles.leaderboard__value}><DeleteForeverIcon fontSize="large" onClick={handleDelete} /></span>
        </article>
    )
}



const FriendPanel = (props) => {
    const [friends, setFriends] = useState([]);
    const [value, setValue] = useState('');
    useEffect(() => {
        props.friendList.forEach(async (f, i) => {
            const dp = await fetch(`/getDp/${f}`);
            const parsedDp = await dp.json();
            const username = await fetch(`/getUsername/${f}`);
            const parsedUsername = await username.json();
            const object = {
                username: parsedUsername.name,
                id: f,
                dp: parsedDp.src
            }
            setFriends((prev) => [...prev, object]);
        });
    }, [props.friendList]);

    let search = friends.filter(f => f.username.includes(value)).map((m, i) => {
        return <TempPanel username={m.username} dp={m.dp} key={i} id={m.id} />
    })

    return (
        <div className={styles.main}>
            <ToastContainer />
            <article className={styles.leaderboard}>
                <header style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="text" className={styles.inputBar} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search Friends..." />
                    <h1 className={styles.leaderboard__title}><span className={styles.leaderboard__title__top}>Friend</span><span className={styles.leaderboard__title__bottom}>List</span></h1>
                </header>
                <main className={styles.leaderboard__profiles}>
                    {search}
                </main>
            </article>
        </div >
    );
}

export default FriendPanel;