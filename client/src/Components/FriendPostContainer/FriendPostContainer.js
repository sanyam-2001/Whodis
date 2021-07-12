import React from 'react';
import FriendPanel from './../FriendPanel/FriendPanel';
import CreatePost from '../../Components/CreatePost/CreatePost'
const FriendPostContainer = (props) => {
    return (
        <div style={{ marginTop: '5%', marginLeft: '2.5%' }}>
            <FriendPanel friendList={props.friendList} setFriendList={props.setFriendList} />
            <CreatePost />
        </div>
    );
}

export default FriendPostContainer;