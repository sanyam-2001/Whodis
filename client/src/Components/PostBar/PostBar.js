import React, { useState, useRef } from 'react';
import styles from './PostBar.module.css'
import CancelIcon from '@material-ui/icons/Cancel';
import defaultImage from '../../default.jpg';
import moment from 'moment';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import { toast, ToastContainer } from 'react-toastify';
const TextArea = withStyles({
    root: {

        "& .MuiInputBase-root": {
            color: "black",
            fontSize: '24px',
            "& input": {
                textAlign: "left",
            }
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: 'none'
            },
            '&:hover fieldset': {
                border: 'none'
            },
            '&.Mui-focused fieldset': {
                border: 'none'
            },
        },
    },
})(TextField);


const PostBar = (props) => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState([]);
    const inputRef = useRef(null);
    const attemptPost = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `BEARER ${localStorage.getItem('JWTTOKEN')}`);

        var formdata = new FormData();
        if (image[0]) {
            formdata.append("img", image[0]);
        }
        else {
            formdata.append("img", null);
        }
        formdata.append('caption', caption);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("/createPost", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result);
                setCaption('');
                inputRef.current.value = ''
                props.setOpen(false);
                toast('Posted!');
                props.setPosts((prev) => [...prev, result])

            })
            .catch(error => console.log('error', error));
    }
    return (
        <div className={styles.backdrop} style={{ display: props.open ? 'block' : 'none' }}>
            <ToastContainer />
            <div className={styles.prompt}>
                <div className={styles.header}>
                    <h2 style={{ fontFamily: 'helvetica' }}>Create Post</h2>
                    <CancelIcon fontSize="large" style={{ position: 'absolute', top: '12px', right: '10px', color: 'gray', cursor: 'pointer' }} onClick={() => {
                        setCaption('');
                        inputRef.current.value = ''
                        props.setOpen(false);
                    }} />
                </div>
                <hr style={{ border: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(0, 0, 0, 0.2)' }} />
                <div style={{ width: '90%', margin: 'auto', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }} >
                        <img src={props.dp || defaultImage} alt={props.name} height="35px" width="35px" style={{ objectFit: 'cover', borderRadius: '50%' }} />
                        <h3 style={{ fontFamily: 'monospace', marginLeft: '16px' }}>{props.name}</h3>
                    </div>
                    <div style={{ fontFamily: 'monospace' }}>
                        {moment().format('dddd')}
                    </div>
                </div>

                <div style={{ textAlign: 'center', maxHeight: '50vh', overflowY: 'scroll', marginTop: '10px', marginBottom: '10px' }}>
                    <TextArea
                        id="mainTextAreaCaption"
                        placeholder={`Whats on Your mind, ${props.name.split(' ')[0]}?`}
                        multiline
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        variant="outlined"
                        style={{ width: '90%', maxHeight: '15vh', overflowY: 'scroll' }}
                        className={styles.scrollbar}
                    />
                    <div style={{ position: 'relative' }}>
                        {image[0] ? <img src={URL.createObjectURL(image[0])} alt={"POST"} style={{ width: '90%' }} /> : null}
                    </div>
                </div>

                <div style={{ width: '90%', margin: 'auto', marginBottom: '20px', marginTop: '20px' }}>
                    <div style={{ padding: '10px', border: '1px solid rgba(0, 0, 0, 0.3)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontFamily: 'monospace' }}>
                            Add to your Post
                        </div>
                        <div>
                            <input type="file" accept="images/*" style={{ display: 'none' }} ref={inputRef} onChange={(e) => setImage(e.target.files)} />
                            <PermMediaIcon style={{ color: 'green', cursor: 'pointer', marginLeft: '10px', marginRight: '10px', padding: '5px' }} onClick={() => inputRef.current.click()} />
                            <LocationOnIcon style={{ color: 'red', cursor: 'pointer', marginLeft: '10px', marginRight: '10px', padding: '5px' }} />
                        </div>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        {caption || image[0] ?
                            <button style={{ width: '100%', padding: '8px', ouline: 'none', border: 'none', borderRadius: '10px', backgroundColor: 'rgb(57,92,222)', color: 'white', fontSize: '20px', cursor: 'pointer' }} onClick={attemptPost}>Post</button>
                            :
                            <button style={{ width: '100%', padding: '8px', ouline: 'none', border: 'none', borderRadius: '10px', fontSize: '20px' }}>Post</button>

                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PostBar;