import React, { useState, useRef } from 'react';
import Header from '../Header/Header'
import styles from './Hero.module.css'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import PublishIcon from '@material-ui/icons/Publish';
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge';
import JWTGET from '../../../Requests/Gets';
import { ToastContainer, toast } from 'react-toastify';


const Hero = (props) => {
    const [areButtonsVisible, setButtonsVisible] = useState('none');
    let fileRef = useRef(null);


    const changeBackgroundPosition = async () => {
        const newIsCenter = props.isCenter;
        const response = await JWTGET('/changeCoverPosition');
        if (response.success) {
            props.setisCenter(!newIsCenter);
            toast('Cover Position Updated!')
        }
    }
    const coverImageChangeHandler = (e) => {
        if (e.target.files.length !== 1) return;
        const newImage = e.target.files[0];
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `BEARER ${localStorage.getItem('JWTTOKEN')}`);

        const formdata = new FormData();
        formdata.append("coverImage", newImage);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("/coverImage", requestOptions)
            .then(response => response.json())
            .then(result => {
                props.setBackgroundImage(result.src);
                toast('Cover Picture Updated!')
            })
            .catch(error => {
                console.log('error', error)
            });
    }



    return (
        <div className={styles.heroContainer} style={{ height: '60vh', backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.4)), url(${props.backgroundImage})`, backgroundPosition: props.isCenter ? 'center' : '0% 0%' }}>
            <ToastContainer />
            <Header profileImage={props.profileImage} setDrawerOpen={props.setDrawerOpen} />
            {/* Information START*/}
            <div style={{ color: "white" }} className={styles.info}>
                <h1>{props.name}</h1>
                <p style={{ display: 'flex', alignItems: 'center' }}><LocationOnIcon />{props.location}</p>
            </div>
            {/* Information END */}
            <div style={{ position: 'absolute', bottom: '5%', right: '5%' }} >
                <div style={{ marginTop: '10px', display: areButtonsVisible }} >
                    <Fab color="primary" aria-label="edit" onClick={changeBackgroundPosition}>
                        <PhotoSizeSelectLargeIcon />
                    </Fab>
                </div>
                <div style={{ marginTop: '10px', display: areButtonsVisible }} >
                    <Fab color="secondary" aria-label="edit" onClick={() => fileRef.current.click()}>
                        <PublishIcon />
                    </Fab>
                    <input type="file" accept="image/*" style={{ display: 'none' }} ref={fileRef} onChange={coverImageChangeHandler} />
                </div>
                <div style={{ marginTop: '10px' }}>
                    <Fab color="inherit" aria-label="edit" onClick={() => { setButtonsVisible((prev) => prev === "block" ? "none" : "block") }}>
                        <EditIcon />
                    </Fab>
                </div>

            </div>
        </div>
    );
}

export default Hero;