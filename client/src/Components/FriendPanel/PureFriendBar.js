import React, { useEffect, useState } from 'react';
import styles from './FriendPanel.module.css';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import gradient from './gradient.jpg'
import JWTGET from './../../Requests/Gets';
import { toast, ToastContainer } from 'react-toastify';
const PureFriendBar = (props) => {
    const [dp, setDp] = useState(null);
    const [name, setName] = useState(null);
    const [removed, setRemoved] = useState(false)

    useEffect(() => {
        fetch(`/getDp/${props.id}`)
            .then(res => res.json())
            .then(img => {
                setDp(img.src)
            })
            .catch(err => console.log(err));

        fetch(`/getUsername/${props.id}`)
            .then(res => res.json())
            .then(user => {
                setName(user.name)
            })
            .catch(err => console.log(err))
    }, [props.id]);
    const removeFriend = () => {
        JWTGET(`/removeFriend/${props.id}`)
            .then(res => {
                console.log(res);
                toast('Friend Removed!');
                setRemoved(true);
            })
    }
    return (
        <div style={{ visibility: !removed ? 'visible' : 'hidden', height: '5vh', display: 'flex', alignItems: 'center', marginTop: '16px', justifyContent: 'space-between', backgroundImage: `url(${gradient})`, backgroundSize: 'cover', padding: '6px', color: 'black', borderRadius: '18px' }}>
            <ToastContainer />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ backgroundImage: `url(${dp})`, backgroundSize: 'cover', height: '40px', width: '40px', borderRadius: '50%' }}></div>
                <div className={styles.nameFont} style={{ flex: 1, marginLeft: '8px', fontSize: '14px' }}>{name}</div>
            </div>
            <div>
                <DeleteForeverIcon style={{ color: 'red', cursor: 'pointer' }} onClick={removeFriend} />
            </div>
        </div >
    );
}

export default PureFriendBar;