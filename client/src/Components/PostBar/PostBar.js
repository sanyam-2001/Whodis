import React, { useState, useRef } from 'react';
import styles from './PostBar.module.css'
import CancelIcon from '@material-ui/icons/Cancel';
import defaultImage from '../../default.jpg';
import moment from 'moment';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import LocationOnIcon from '@material-ui/icons/LocationOn';
const PostBar = (props) => {

    const [caption, setCaption] = useState('');
    const inputRef = useRef(null);
    return (
        <div className={styles.backdrop} style={{ display: props.open ? 'block' : 'none' }}>
            <div className={styles.prompt}>
                <div className={styles.header}>
                    <h2 style={{ fontFamily: 'helvetica' }}>Create Post</h2>
                    <CancelIcon fontSize="large" style={{ position: 'absolute', top: '12px', right: '10px', color: 'gray', cursor: 'pointer' }} onClick={() => props.setOpen(false)} />
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

                {/* MIDDLE PART */}

                <div style={{ width: '90%', margin: 'auto', marginBottom: '20px', marginTop: '20px' }}>
                    <div style={{ padding: '10px', border: '1px solid rgba(0, 0, 0, 0.3)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontFamily: 'monospace' }}>
                            Add to your Post
                        </div>
                        <div>
                            <input type="file" accept="images/*" style={{ display: 'none' }} ref={inputRef} />
                            <PermMediaIcon style={{ color: 'green', cursor: 'pointer', marginLeft: '10px', marginRight: '10px', padding: '5px' }} onClick={() => inputRef.current.click()} />
                            <LocationOnIcon style={{ color: 'red', cursor: 'pointer', marginLeft: '10px', marginRight: '10px', padding: '5px' }} />
                        </div>
                    </div>
                    <div style={{ marginTop: '10px' }}>
                        {caption === '' ?
                            <button style={{ width: '100%', padding: '8px', ouline: 'none', border: 'none', borderRadius: '10px', fontSize: '20px' }}>Post</button>
                            :
                            <button style={{ width: '100%', padding: '8px', ouline: 'none', border: 'none', borderRadius: '10px', backgroundColor: 'rgb(57,92,222)', color: 'white', fontSize: '20px', cursor: 'pointer' }}>Post</button>
                        }
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PostBar;