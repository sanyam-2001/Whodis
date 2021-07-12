import React from 'react';
import styles from './ContactCard.module.css'
import defaultImage from '../../default.jpg'
const ContactCard = (props) => {
    return (
        <div style={{ cursor: 'pointer', backgroundColor: props.currentUser === props.id ? 'rgb(50,55,57)' : null }} onClick={() => props.setCurrentUser(props.id)}>
            <div className={styles.mainContainer} style={{ display: 'flex', padding: '8px', justifyContent: 'space-around' }}>
                <div style={{ flex: 2, textAlign: 'center' }}>
                    <img src={props.dp || defaultImage} alt="thisUserDP" style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ color: 'white', flex: 4, borderBottom: '1px solid rgb(50,55,57)', textAlign: 'center', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>{props.name}</div>
                </h4>
            </div>
        </div>
    );
}

export default ContactCard;