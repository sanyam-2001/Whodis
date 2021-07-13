import React from 'react';
import styles from './CreatePost.module.css';
import defaultImage from '../../default.jpg'
const CreatePost = (props) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.postBox}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <img src={props.dp || defaultImage} alt={'DP'} height="35" width="35" className={styles.image} />
                </div>
                <div style={{ flex: 2 }}>
                    <input type="text" style={{ width: '70%' }} className={styles.input} placeholder="Whats On Your Mind..." />
                </div>
            </div>
            <div style={{ marginTop: '5%', border: '1px solid rgba(0, 0, 0, 0.1)', boxShadow: '2px 2px 6px 6px rgba(0, 0, 0, 0.1)', padding: '2.5vh', borderRadius: '30px', height: '20vh', position: 'relative' }}>
                <div className={styles.content}>
                    <h2>POSTS</h2>
                    <h2>POSTS</h2>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;