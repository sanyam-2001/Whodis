import React, { useState, useEffect, useRef } from 'react';
import styles from './CommentPanel.module.css';
import gsap from 'gsap'
import { Back } from 'gsap'
import Default from '../../default.jpg'
const CommentPanel = (props) => {
    let commentRef = useRef(null);

    useEffect(() => {
        if (props.open) {
            const tl = new gsap.timeline({ paused: false })
            tl.to([commentRef.current], { transform: 'scaleY(1)', ease: Back.easeOut.config(1.5) })
            tl.play()
        }
        else {
            const tl = new gsap.timeline({ paused: false })
            tl.to([commentRef.current], { transform: 'scaleY(0)' })
            tl.play()
        }
    }, [props.open])
    return (
        <div className={styles.commentPanel} ref={commentRef}>
            <div className={styles.heading}>Comments</div>
            <div className={styles.body}>
                <div className={styles.commentContainer}>

                </div>
                <div className={styles.inputBar}>
                    <div>
                        <img src={props.dp || Default} />
                        <input type="text" placeholder="Your Comments..." />
                    </div>
                    <div>
                        <button>Post</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentPanel;