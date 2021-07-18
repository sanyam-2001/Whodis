import React from 'react';
import FriendPanel from './../FriendPanel/FriendPanel';
import CreatePost from '../../Components/CreatePost/CreatePost';
import styles from './FriendPostContainer.module.css'
const FriendPostContainer = (props) => {
    return (
        <div className={styles.container}>
            <FriendPanel friendList={props.friendList} setFriendList={props.setFriendList} />
            <CreatePost dp={props.dp} name={props.name} setPosts={props.setPosts} />
        </div>
    );
}

export default FriendPostContainer;