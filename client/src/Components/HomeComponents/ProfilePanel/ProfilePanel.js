import React, { useState, useRef } from 'react';
import styles from './ProfilePanel.module.css'
import { Fab } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import { ToastContainer, toast } from 'react-toastify';
const ProfilePanel = (props) => {
    const [previewProfileImage, setPreviewProfileImage] = useState('');
    let inputRef = useRef(null);
    const handleImageSelect = (e) => {
        if (e.target.files.length === 1) {
            setPreviewProfileImage(URL.createObjectURL(e.target.files[0]));
        }
        else {
            setPreviewProfileImage('');
        }
    }
    const handleUpload = (e) => {
        if (inputRef.current.files.length !== 1) return;

        const newImage = inputRef.current.files[0];
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `BEARER ${localStorage.getItem('JWTTOKEN')}`);

        const formdata = new FormData();
        formdata.append("dp", newImage);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("/dp", requestOptions)
            .then(response => response.json())
            .then(result => {
                props.setDp(result.src);
                toast('Profile Image Uploaded!');
                inputRef.current.value = '';
                setPreviewProfileImage('');
            })
            .catch(error => {
                console.log('error', error);
                inputRef.current.value = '';
                setPreviewProfileImage('');
            });
    }
    return (
        <div className={styles.profileContainer}>
            <ToastContainer />
            <div className={styles.picture} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${previewProfileImage || (props.profileImage)})`, width: '100%', height: '60vh' }}>
                <h3 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: props.profileImage || previewProfileImage ? 'none' : 'block' }}>No Profile Picture</h3>
                <div style={{ position: 'absolute', right: '5%', bottom: '0%', transform: 'translateY(50%)', zIndex: '5', display: previewProfileImage ? 'none' : 'block' }}>
                    <Fab color="primary" aria-label="edit" onClick={() => inputRef.current.click()}>
                        <PublishIcon />
                    </Fab>
                    <input type="file" accept="image/*" style={{ display: 'none' }} ref={inputRef} onChange={handleImageSelect} />
                </div>
                <div style={{ position: 'absolute', right: '5%', bottom: '0%', transform: 'translateY(50%)', zIndex: '5', display: !previewProfileImage ? 'none' : 'block' }}>
                    <Fab aria-label="edit" style={{ color: 'red', marginRight: '10px' }} onClick={() => { inputRef.current.value = ''; setPreviewProfileImage(''); toast('Discarded!') }}>
                        <DeleteIcon />
                    </Fab>
                    <Fab aria-label="edit" style={{ color: 'green' }} onClick={handleUpload}>
                        <CheckIcon />
                    </Fab>
                </div>
            </div>
            <div>

                <div className={styles.blockquote}>

                    <h1><span className="Cdefault">&#8220;About</span></h1>
                    <hr style={{ margin: '5px' }} />
                    <p>{props.about}
                    </p>
                </div>
                <div className={styles.blockquote}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                        <h4 style={{ color: 'black' }}>Friends</h4>
                        <h4>200</h4>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                        <h4 style={{ color: 'black' }}>Requests Sent</h4>
                        <h4>50</h4>
                    </div>
                    <hr />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                        <h4 style={{ color: 'black' }}>Requests Recieved</h4>
                        <h4>150</h4>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ProfilePanel;