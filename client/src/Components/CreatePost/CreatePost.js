import React, { useState } from 'react';
import styles from './CreatePost.module.css';
import defaultImage from '../../default.jpg';
import PostBar from './../PostBar/PostBar';
const CreatePost = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.mainContainer}>
            <PostBar open={open} setOpen={setOpen} dp={props.dp} name={props.name} setPosts={props.setPosts} />
            <div className={styles.postBox}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <img src={props.dp || defaultImage} alt={'DP'} height="35" width="35" className={styles.image} />
                </div>
                <div style={{ flex: 2 }}>
                    <input
                        type="text"
                        style={{ width: '70%' }}
                        className={styles.input}
                        placeholder="Whats On Your Mind..."
                        onClick={() => setOpen(true)}
                    />
                </div>
            </div>

            <div className={styles.content}>
                <h2>POSTS</h2>
                <h2>POSTS</h2>
            </div>

        </div>
    );
}

export default CreatePost;