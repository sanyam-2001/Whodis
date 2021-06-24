import React from 'react';
import styles from './Message.module.css'

const Message = (props) => {
    return (
        <div className={styles.font} style={{ display: 'flex', justifyContent: 'space-between', width: '80%', backgroundColor: 'white', padding: '6px', margin: '8px', borderRadius: '10px' }}>
            <div><span style={{ color: props.sender === "You" ? "green" : "red" }}>{props.sender}</span> : {props.message}</div>
            <div style={{ color: 'grey' }}>{props.time}</div>
        </div>
    );
}

export default Message;