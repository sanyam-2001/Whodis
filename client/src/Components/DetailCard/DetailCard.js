import React from 'react';
import styles from './DetailCard.module.css'

const DetailCard = (props) => {
    const handleClick = () => {
        let thisType;
        if (props.field === "AGE") {
            thisType = "AGE";
        }
        else if (props.field === "GENDER") {
            thisType = "GENDER"
        }
        else {
            thisType = "RELATIONSHIP";
        }
        props.setUpdaterType(thisType);
    }
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div style={{ backgroundColor: props.color, flex: '5' }}>{`${props.valueName}`}</div>
                <div className={styles.edit} onClick={handleClick} style={{ backgroundColor: 'rgb(34, 34, 34)', flex: '1', fontFamily: 'Helvetica', color: 'white' }}>EDIT</div>
            </div>
            <div className={styles.footer} >
                {props.field}
            </div>
        </div>
    );
}

export default DetailCard;