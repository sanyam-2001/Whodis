import React from 'react';
import DetailCard from '../DetailCard/DetailCard';
import styles from './Details.module.css'
const getAge = (dateString) => {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
const Details = (props) => {
    return (
        <div className={styles.mainContainer}>
            <DetailCard valueName={props.relationshipStatus} field="RELATIONSHIP STATUS" color="rgb(96, 191, 255)" setUpdaterType={props.setUpdaterType} />
            <DetailCard valueName={props.gender} field="GENDER" color="salmon" setUpdaterType={props.setUpdaterType} />
            <DetailCard valueName={getAge(props.dob)} field="AGE" color="rgb(243, 255, 133)" setUpdaterType={props.setUpdaterType} />

        </div>
    );
}

export default Details;